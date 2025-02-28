"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const ShopContext = createContext();

export function ShopProvider({ children }) {
	const [shops, setShops] = useState([]);
	const [images, setImages] = useState([]);

	// Charger les shops et images
	const fetchShops = async () => {
		try {
			const response = await fetch("/api/shop", { cache: "no-store" });
			const data = await response.json();
			setShops(data.shops);
			setImages(data.images);
		} catch (error) {
			console.error("Erreur de chargement des shops:", error);
		}
	};

	useEffect(() => {
		fetchShops();
	}, []);

	// Ajouter un shop
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

	// Editer un shop
	const updateShop = async (id, updatedShop) => {
		try {
			const response = await fetch("/api/shop", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id, ...updatedShop }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Échec de la mise à jour");
			}

			const result = await response.json();
			setShops((prevShops) =>
				prevShops.map((shop) => (shop._id === id ? result.shop : shop))
			);

			toast.success("Shop mis à jour avec succès !");
			setTimeout(fetchShops, 500); // 🔄 Re-fetch différé
		} catch (error) {
			toast.error(error.message || "Échec de la mise à jour du shop.");
		}
	};

	// Supprimer un shop
	const deleteShop = async (id) => {
		try {
			const response = await fetch(`/api/shop?id=${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Échec de la suppression");
			}

			setShops((prevShops) =>
				prevShops.filter((shop) => shop._id !== id)
			);

			toast.success("Shop supprimé avec succès !");
			fetchShops();
		} catch (error) {
			toast.error(error.message || "Échec de la suppression");
		}
	};

	// ✅ Toggle incart avec mise à jour optimiste
	const toggleInCart = async (id, currentValue) => {
		setShops((prevShops) =>
			prevShops.map((shop) =>
				shop._id === id ? { ...shop, incart: !currentValue } : shop
			)
		);

		try {
			const response = await fetch("/api/shop", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id, incart: !currentValue }),
			});

			if (!response.ok) {
				throw new Error("Échec de la mise à jour");
			}

			toast.success("Statut InCart mis à jour !");
			setTimeout(fetchShops, 500);
		} catch (error) {
			// ❌ Rollback si erreur
			setShops((prevShops) =>
				prevShops.map((shop) =>
					shop._id === id ? { ...shop, incart: currentValue } : shop
				)
			);
			toast.error("Erreur lors de la mise à jour.");
		}
	};

	// ✅ Toggle tobuy avec mise à jour optimiste
	const toggleToBuy = async (id, currentValue) => {
		setShops((prevShops) =>
			prevShops.map((shop) =>
				shop._id === id ? { ...shop, tobuy: !currentValue } : shop
			)
		);

		try {
			const response = await fetch("/api/shop", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id, tobuy: !currentValue }),
			});

			if (!response.ok) {
				throw new Error("Échec de la mise à jour");
			}

			toast.success("Statut ToBuy mis à jour !");
			setTimeout(fetchShops, 500);
		} catch (error) {
			// ❌ Rollback si erreur
			setShops((prevShops) =>
				prevShops.map((shop) =>
					shop._id === id ? { ...shop, tobuy: currentValue } : shop
				)
			);
			toast.error("Erreur lors de la mise à jour.");
		}
	};

	return (
		<ShopContext.Provider
			value={{
				shops,
				images,
				addShop,
				updateShop,
				deleteShop,
				toggleInCart,
				toggleToBuy,
			}}
		>
			{children}
		</ShopContext.Provider>
	);
}

export default ShopContext;

export function useShops() {
	return useContext(ShopContext);
}
