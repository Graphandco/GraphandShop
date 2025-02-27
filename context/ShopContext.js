"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const ShopContext = createContext();

export function ShopProvider({ children }) {
	const [shops, setShops] = useState([]);
	const [images, setImages] = useState([]); // ✅ Stocke les images disponibles

	// ✅ Charger les shops et les images
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

	// ✅ Ajouter un shop avec image
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

	return (
		<ShopContext.Provider value={{ shops, images, addShop }}>
			{children}
		</ShopContext.Provider>
	);
}

export default ShopContext;

export function useShops() {
	return useContext(ShopContext);
}
