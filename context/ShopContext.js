"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const ShopContext = createContext();

export function ShopProvider({ children }) {
	const [shops, setShops] = useState([]);
	const [images, setImages] = useState([]);

	// Charger les items et les images
	const fetchShops = async () => {
		try {
			const response = await fetch("/api/shop", { cache: "no-store" });
			const data = await response.json();
			setShops(data.shops);
			setImages(data.images); // ✅ Charger les images disponibles
		} catch (error) {
			console.error("Erreur de chargement des shops:", error);
		}
	};

	useEffect(() => {
		fetchShops();
	}, []);

	// Ajouter un item avec image
	const addShop = async (newShop) => {
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
			setShops((prevShops) => [...prevShops, result.shop]);
			toast.success("Shop ajouté avec succès !");
			fetchShops();
		} catch (error) {
			toast.error(error.message || "Échec de l'ajout du shop.");
		}
	};

	// Supprimer un item
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
		<ShopContext.Provider value={{ shops, images, addShop, deleteShop }}>
			{children}
		</ShopContext.Provider>
	);
}

export default ShopContext;

export function useShops() {
	return useContext(ShopContext);
}
