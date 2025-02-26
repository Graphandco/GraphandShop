"use client";
import { useShops } from "@/hooks/useShops";
import { useCategories } from "@/hooks/useCategories";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
// UI
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function AddShop() {
	const { addShop } = useShops();
	const { categories, addCategory } = useCategories();
	console.log(categories);

	const router = useRouter();

	// Utilisation de react-hook-form
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm();

	// Fonction pour ajouter un shop
	const onSubmit = (data) => {
		addShop(data);
		reset(); // Réinitialise le formulaire après soumission
		router.push("/");
	};

	return (
		<>
			<div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-3xl text-center mb-8 text-primary font-title">
						Ajouter un produit
					</h1>

					{/* Add Todo Form */}
					<div className=" p-6 d mb-8">
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
													{categories.map((cat) => (
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

								<Button type="submit">
									<FaPlus />
									<span className="font-bold ">
										Ajouter le produit
									</span>
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
