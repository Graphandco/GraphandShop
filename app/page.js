"use client";
import { useShops } from "@/hooks/useShops";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import ShopList from "@/components/ShopList";

export default function Home() {
	const { addShop } = useShops();

	// Utilisation de react-hook-form
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	// Fonction pour ajouter un shop
	const onSubmit = (data) => {
		addShop(data);
		reset(); // Réinitialise le formulaire après soumission
	};

	return (
		<>
			<div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-3xl text-center mb-8 text-primary font-title">
						Shop List
					</h1>

					<Button variant="outline">+</Button>

					{/* Add Todo Form */}
					<div className=" p-6 d mb-8">
						<h2 className="text-xl font-semibold mb-4">
							Ajouter un nouvel élément
						</h2>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="space-y-4">
								<Input
									type="text"
									placeholder="Nom du produit"
									{...register("title", {
										required: "Le titre est requis",
									})}
								/>
								{errors.title && (
									<p className="text-red-500 text-sm">
										{errors.title.message}
									</p>
								)}

								<Button type="submit">
									<FaPlus />
									<span className="font-bold ">
										Ajouter le produit
									</span>
								</Button>
							</div>
						</form>
					</div>

					{/* Todo List */}
					<ShopList />
				</div>
			</div>
		</>
	);
}
