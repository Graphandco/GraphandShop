"use client";
import { useCategories } from "@/hooks/useCategories";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AddCategory() {
	const { categories, addCategory } = useCategories();
	const router = useRouter();

	useEffect(() => {
		console.log(categories);
	}, []);

	// Utilisation de react-hook-form
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	// Fonction pour ajouter un shop
	const onSubmit = (data) => {
		addCategory(data);
		reset(); // Réinitialise le formulaire après soumission
		router.push("/category/add");
	};

	return (
		<>
			<div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto">
					<div>
						{categories?.map((category) => (
							<div key={category._id}>{category.name}</div>
						))}
					</div>
					<h1 className="text-3xl text-center mb-8 text-primary font-title">
						Ajouter une catégorie
					</h1>

					{/* Add Todo Form */}
					<div className=" p-6 d mb-8">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="space-y-4">
								<Input
									type="text"
									placeholder="Nom de la catégorie"
									{...register("name", {
										required: "Le titre est requis",
									})}
								/>
								{errors.name && (
									<p className="text-red-500 text-sm">
										{errors.name.message}
									</p>
								)}
								<div className="flex items-center gap-5">
									<Button variant="outline">
										<Link href="/" className="font-bold">
											Retour à l'accueil
										</Link>
									</Button>
									<Button type="submit">
										<FaPlus />
										<span className="font-bold ">
											Ajouter la catégorie
										</span>
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
