"use client";
import { useShops } from "@/hooks/useShops";
import { Heart, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const ShopItem = ({ shop, pageType, editMode }) => {
	const { deleteShop, toggleInCart, toggleToBuy } = useShops();

	let catColor;
	switch (shop.category?.name) {
		case "Divers":
			catColor = "border-red-500";
			break;
		case "Boissons":
			catColor = "border-blue-400";
			break;
		case "Fruits & Légumes":
			catColor = "border-green-500";
			break;
		case "Viande & Charcuterie":
			catColor = "border-red-500";
			break;
		default:
			catColor = "border-card";
	}

	return (
		<div
			className={`border-2 ${catColor} p-4 flex flex-col justify-center gap-1 text-center rounded-lg relative ${
				shop.tobuy && pageType === "inventaire" && "opacity-50"
			}`}
			onClick={() =>
				pageType === "shoppingList"
					? toggleInCart(shop._id, shop.incart)
					: !shop.tobuy && toggleToBuy(shop._id, shop.tobuy)
			}
		>
			{shop.image && (
				<Image
					src={`/images/items/${shop.image}`}
					width={32}
					height={32}
					alt={shop.title}
					className="mx-auto"
					quality={75}
				/>
			)}
			<div className="text-[.9rem]">{shop.title}</div>
			{shop.favorite && (
				<div className="absolute top-2 right-2">
					<Heart size={14} className="text-primary fill-primary" />
				</div>
			)}
			{/* <h3 className="text-size-small">
      {shop.category?.name}
   </h3> */}
			{/* <p className="text-gray-600">
				{shop.tobuy ? "Liste" : "Inventaire"}
			</p> */}
			{/* <p className="text-gray-600">
				{shop.incart ? "Panier" : "Pas panier"}
			</p> */}
			{pageType === "inventaire" && editMode && (
				<div className="flex justify-center gap-3">
					<Button size="icon">
						<Link href={`/shop/edit/${shop._id}`}>
							<Pencil />
						</Link>
					</Button>
					<Button size="icon" onClick={() => deleteShop(shop._id)}>
						<Trash2 />
					</Button>
				</div>
			)}
		</div>
	);
};

export default ShopItem;
