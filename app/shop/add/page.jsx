"use client";
import { useState } from "react";
import { useShops } from "@/hooks/useShops";
import { useCategories } from "@/hooks/useCategories";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
// UI
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
		control,
		formState: { errors },
	} = useForm();

	// ✅ Fonction pour ajouter un shop
	const onSubmit = (data) => {
		addShop(data);
		reset();
		router.push("/");
	};

	return (
		<>
			<h1 className="">Ajouter un produit</h1>

			<div className="">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4">
						{/* Nom du produit */}
						<Input
							type="text"
							placeholder="Nom du produit"
							className="placeholder:opacity-50"
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

						<Controller
							name="category"
							control={control}
							rules={{
								required: "La catégorie est requise",
							}}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									value={field.value}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Catégorie" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{categories
												.sort((a, b) =>
													a.name.localeCompare(b.name)
												)
												.map((cat) => (
													<SelectItem
														key={cat._id}
														value={cat.name}
													>
														{cat.name}
													</SelectItem>
												))}
										</SelectGroup>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.category && (
							<p className="text-red-500 text-sm">
								{errors.category.message}
							</p>
						)}

						<div className="flex flex-col gap-1">
							<span className="font-bold">Favori ?</span>
							<Heart
								onClick={handleFavorite}
								className={`text-[#dd2525] transition-all cursor-pointer ${
									favorite && "fill-[#dd2525]"
								}`}
							/>
						</div>

						{/* ✅ Sélection d'une image */}
						<div className="bg-card p-5 rounded-lg">
							<p className="font-bold">
								Sélectionnez une image :
							</p>
							<div className="grid grid-cols-[repeat(auto-fit,minmax(75px,1fr))] my-4">
								{images.map((img) => {
									if (img === ".DS_Store") return null;
									return (
										<div
											key={img}
											className={`p-1 mb-2 flex flex-col justify-center items-center gap-1 text-center cursor-pointer rounded-md ${
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
												width={30}
												height={30}
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
		</>
	);
}
