"use client";
import { useShops } from "@/hooks/useShops";
import { Heart, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const ShopItem = ({ shop }) => {
	const { deleteShop } = useShops();

	let catColor;
	switch (shop.category?.name) {
		case "Divers":
			catColor = "border-red-500";
			break;
		case "Boissons":
			catColor = "border-blue-500";
			break;
		case "Fruits & Légumes":
			catColor = "border-green-500";
			break;
		default:
			catColor = "border-card";
	}

	return (
		<div
			className={`border-2 ${catColor} p-4 flex flex-col justify-center gap-2 text-center rounded-lg relative`}
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
			{shop.favorite && (
				<div className="absolute top-2 right-2">
					<Heart size={14} className="text-primary fill-primary" />
				</div>
			)}
			<div className="text-size-small">{shop.title}</div>
			{/* <h3 className="text-size-small">
      {shop.category?.name}
   </h3> */}
			<p className="text-gray-600">
				{shop.tobuy ? "Inventaire" : "Liste"}
			</p>

			<div className="flex space-x-2">
				<Button size="icon">
					<Link href={`/shop/edit/${shop._id}`}>
						<Pencil />
					</Link>
				</Button>
				<Button size="icon" onClick={() => deleteShop(shop._id)}>
					<Trash2 />
				</Button>
			</div>
		</div>
	);
};

export default ShopItem;
