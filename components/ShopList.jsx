"use client";
import { useShops } from "@/hooks/useShops";
import { useCategories } from "@/hooks/useCategories";
import { useState } from "react";
import ShopItem from "./ShopItem";
import { Button } from "./ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ShopList = ({ pageType }) => {
	const { shops, toggleToBuy } = useShops();
	const { categories } = useCategories();
	const [editMode, setEditMode] = useState(false);

	const listingProducts =
		pageType === "shoppingList"
			? shops.filter((shop) => shop.tobuy && !shop.incart)
			: shops;
	const incartProducts = shops.filter((shop) => shop.tobuy && shop.incart);

	return (
		<>
			<section className="shoplist mt-8">
				{pageType === "inventaire" && (
					<div className="flex items-center justify-end space-x-2">
						<Switch
							id="edit-mode"
							checked={!editMode}
							onCheckedChange={() => setEditMode((prev) => !prev)}
							className="-scale-x-100"
						/>
						<Label htmlFor="edit-mode">Éditer</Label>
					</div>
				)}
				{categories.map((cat) => (
					<div key={cat._id} className="">
						{/* On affiche le titre uniquement si la catégorie contient des éléments */}
						{listingProducts?.some(
							(shop) => shop.category?._id === cat._id
						) && (
							<div className="font-title text-size-h4 text-primary p-2 mt-8 mb-3">
								{cat.name}
							</div>
						)}

						{/* <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4"> */}
						<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
							{listingProducts
								?.filter(
									(shop) => shop.category?._id === cat._id
								)
								.map((shop) => {
									return (
										<ShopItem
											key={shop._id}
											shop={shop}
											pageType={pageType}
											editMode={editMode}
										/>
									);
								})}
						</div>
					</div>
				))}
			</section>
			{pageType === "shoppingList" && (
				<section className="mt-12">
					<div className="font-title text-size-h5 text-white my-2">
						Déjà dans le panier
					</div>
					<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-5">
						{incartProducts.map((shop) => {
							return (
								<ShopItem
									key={shop._id}
									shop={shop}
									pageType={pageType}
								/>
							);
						})}
					</div>
					<Button
						onClick={() =>
							incartProducts.forEach((shop) =>
								toggleToBuy(shop._id, shop.tobuy)
							)
						}
					>
						Vider la liste
					</Button>
				</section>
			)}
		</>
	);
};

export default ShopList;
