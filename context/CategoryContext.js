"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
	const [categories, setCategories] = useState([]);
	const router = useRouter(); // ✅ Utilisé pour revalider la page

	// Charger les shops au montage
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch("/api/category");
				const data = await response.json();
				setCategories(data.categories);
			} catch (error) {
				console.error("Erreur de chargement des shops:", error);
			}
		};

		fetchCategories();
	}, []);

	// Ajouter un nouveau shop
	const addCategory = async (newCategory) => {
		if (!newCategory.name) {
			toast.warning("Le titre est requis.");
			return;
		}

		try {
			const response = await fetch("/api/category", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newCategory),
			});

			const data = await response.json();

			// Mettre à jour l'état avec le nouveau shop
			setCategories((prevCategories) => [
				...prevCategories,
				data.category,
			]);
			toast.success("Categorie ajoutée avec succès !");
		} catch (error) {
			toast.error("Échec de l'ajout du shop.");
		}
	};

	// ✅ Fonction pour supprimer un shop
	const deleteCategory = async (id) => {
		try {
			const response = await fetch(`/api/category?id=${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Échec de la suppression");
			}

			// Mettre à jour la liste localement
			setCategories((prevCategories) =>
				prevCategories.filter((category) => category._id !== id)
			);

			// ✅ Forcer le rechargement des données
			router.refresh();

			toast.success("Shop supprimé avec succès !");
		} catch (error) {
			toast.error(error.message || "Échec de la suppression");
		}
	};

	return (
		<CategoryContext.Provider
			value={{ categories, setCategories, addCategory, deleteCategory }}
		>
			{children}
		</CategoryContext.Provider>
	);
}

// ✅ Exportation par défaut du contexte
export default CategoryContext;

// ✅ Fonction pour utiliser le contexte
export function usecategories() {
	return useContext(CategoryContext);
}
