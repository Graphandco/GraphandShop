"use client";

import { useState } from "react";
import { useShops } from "@/hooks/useShops";
import { useCategories } from "@/hooks/useCategories";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
// UI
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Heart } from "lucide-react";

export default function AddShop() {
	const { addShop, images } = useShops();
	const { categories } = useCategories();
	const router = useRouter();

	const [favorite, setFavorite] = useState(false);
	const handleFavorite = () => {
		setFavorite((prevFavorite) => {
			const newFavorite = !prevFavorite;
			setValue("favorite", newFavorite); // Met à jour le champ avec la nouvelle valeur
			return newFavorite;
		});
	};

	const [selectedImage, setSelectedImage] = useState();
	const handleImageClick = (img) => {
		setValue("image", img);
		setSelectedImage(img);
	};

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm();

	// ✅ Fonction pour ajouter un shop
	const onSubmit = (data) => {
		addShop(data);
		reset();
		router.push("/");
	};

	return (
		<div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl text-center mb-8 text-primary font-title">
					Ajouter un produit
				</h1>

				<div className="p-6">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="space-y-4">
							{/* Nom du produit */}
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

							{/* Sélection de catégorie */}
							<select {...register("category")}>
								{categories.map((cat) => (
									<option key={cat._id} value={cat.name}>
										{cat.name}
									</option>
								))}
							</select>

							<div>
								<Heart
									onClick={handleFavorite}
									className={`text-primary transition-all ${
										favorite && "fill-primary"
									}`}
								/>
							</div>

							{/* ✅ Sélection d'une image */}
							<div>
								<p className="font-bold">
									Sélectionnez une image :
								</p>
								<div className="grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))] my-6">
									{images.map((img) => {
										if (img === ".DS_Store") return null;
										return (
											<div
												key={img}
												className={`p-1 flex flex-col justify-center items-center gap-1 text-center cursor-pointer rounded-md ${
													selectedImage === img
														? "border"
														: ""
												}`}
												onClick={() =>
													handleImageClick(img)
												}
											>
												<Image
													src={`/images/items/${img}`}
													width={25}
													height={25}
													alt={img}
												/>
												<div className="text-[0.7rem] capitalize">
													{img
														.split(".")[0]
														.replace(/_/g, " ")}
												</div>
											</div>
										);
									})}
								</div>
							</div>

							{/* Bouton de soumission */}
							<Button type="submit">
								<FaPlus />
								<span className="font-bold">
									Ajouter le produit
								</span>
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
