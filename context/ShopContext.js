"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const ShopContext = createContext();

export function ShopProvider({ children }) {
	const [shops, setShops] = useState([]);

	// ✅ Charger les shops dès le montage
	const fetchShops = async () => {
		try {
			const response = await fetch("/api/shop", { cache: "no-store" });
			const data = await response.json();
			setShops(data.shops);
		} catch (error) {
			console.error("Erreur de chargement des shops:", error);
		}
	};

	useEffect(() => {
		fetchShops();
	}, []);

	// ✅ Ajouter un nouveau shop
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

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Erreur lors de l'ajout");
			}

			const result = await response.json();

			// ✅ Met à jour immédiatement la liste
			setShops((prevShops) => [...prevShops, result.shop]);

			toast.success("Shop ajouté avec succès !");
			fetchShops(); // ✅ Recharge les shops pour assurer la mise à jour
		} catch (error) {
			toast.error(error.message || "Échec de l'ajout du shop.");
		}
	};

	// ✅ Supprimer un shop
	const deleteShop = async (id) => {
		try {
			const response = await fetch(`/api/shop?id=${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Échec de la suppression");
			}

			// ✅ Met à jour immédiatement la liste sans le shop supprimé
			setShops((prevShops) =>
				prevShops.filter((shop) => shop._id !== id)
			);

			toast.success("Shop supprimé avec succès !");
			fetchShops(); // ✅ Recharge les shops pour s'assurer que tout est à jour
		} catch (error) {
			toast.error(error.message || "Échec de la suppression");
		}
	};

	return (
		<ShopContext.Provider value={{ shops, addShop, deleteShop }}>
			{children}
		</ShopContext.Provider>
	);
}

export default ShopContext;

// ✅ Fonction pour utiliser le contexte
export function useShops() {
	return useContext(ShopContext);
}
