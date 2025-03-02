"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useShops } from "@/hooks/useShops"; // Import du contexte

export default function EditTodo() {
	const { updateShop } = useShops(); // Récupération de updateShop depuis le contexte
	const [shop, setShop] = useState({ title: "" });
	const router = useRouter();
	const { id } = useParams();

	// Charger le shop à éditer
	useEffect(() => {
		const fetchShop = async () => {
			try {
				const response = await fetch(`/api/shop/${id}`);
				const data = await response.json();
				setShop(data.shop);
			} catch (error) {
				toast.error("Échec du chargement du shop");
			}
		};
		fetchShop();
	}, [id]);

	// Gestion de la mise à jour
	const handleUpdate = async () => {
		if (!shop.title) {
			toast.error("Le titre est requis");
			return;
		}
		await updateShop(id, shop); // Utilisation de la fonction du contexte
		router.push("/");
	};

	return (
		<>
			<ToastContainer />
			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold text-center mb-8">
					Éditer Shop
				</h1>
				<div className="p-6 rounded-lg shadow-md mb-8">
					<div className="space-y-4">
						<Input
							type="text"
							placeholder="Titre"
							value={shop.title}
							onChange={(e) =>
								setShop({ ...shop, title: e.target.value })
							}
							className="w-full p-2 border rounded-lg"
						/>
						<Button onClick={handleUpdate}>Mettre à jour</Button>
					</div>
				</div>
			</div>
		</>
	);
}
