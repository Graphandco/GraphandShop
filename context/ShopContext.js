"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ShopContext = createContext();

export function ShopProvider({ children }) {
	const [shops, setShops] = useState([]);
	const router = useRouter(); // ✅ Utilisé pour revalider la page

	// Charger les shops au montage
	useEffect(() => {
		const fetchShops = async () => {
			try {
				const response = await fetch("/api/shop");
				const data = await response.json();
				setShops(data.shops);
			} catch (error) {
				console.error("Erreur de chargement des shops:", error);
			}
		};

		fetchShops();
	}, []);

	// Ajouter un nouveau shop
	const addShop = async (newShop) => {
		if (!newShop.title) {
			toast.warning("Le titre est requis.");
			return;
		}

		try {
			const response = await fetch("/api/shop", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newShop),
			});

			const data = await response.json();

			// Mettre à jour l'état avec le nouveau shop
			setShops((prevShops) => [...prevShops, data.shop]);
			toast.success("Shop ajouté avec succès !");
		} catch (error) {
			toast.error("Échec de l'ajout du shop.");
		}
	};

	// ✅ Fonction pour supprimer un shop
	const deleteShop = async (id) => {
		try {
			const response = await fetch(`/api/shop?id=${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Échec de la suppression");
			}

			// Mettre à jour la liste localement
			setShops((prevShops) =>
				prevShops.filter((shop) => shop._id !== id)
			);

			// ✅ Forcer le rechargement des données
			router.refresh();

			toast.success("Shop supprimé avec succès !");
		} catch (error) {
			toast.error(error.message || "Échec de la suppression");
		}
	};

	return (
		<ShopContext.Provider value={{ shops, setShops, addShop, deleteShop }}>
			{children}
		</ShopContext.Provider>
	);
}

// ✅ Exportation par défaut du contexte
export default ShopContext;

// ✅ Fonction pour utiliser le contexte
export function useShops() {
	return useContext(ShopContext);
}
