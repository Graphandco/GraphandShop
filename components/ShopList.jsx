"use client";
import { useShops } from "@/hooks/useShops";
import { FaTrash, FaEdit } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

const ShopList = () => {
	const { shops, deleteShop } = useShops();
	return (
		// <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
		<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
			{shops?.map((shop) => {
				let catColor;

				switch (shop.category?.name) {
					case "Divers":
						catColor = "bg-red-500";
						break;
					case "Boissons":
						catColor = "bg-blue-500";
						break;
					default:
						catColor = "bg-card";
				}
				return (
					<div
						key={shop._id}
						className={`${catColor} p-4 flex flex-col justify-center gap-2 text-center rounded-lg`}
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
						<div className="text-size-small">{shop.title}</div>
						{/* <h3 className="text-size-small">
							{shop.category?.name}
						</h3>
						<p className="text-gray-600">
							{shop.tobuy ? "Inventaire" : "Liste"}
						</p> */}

						{/* <div className="flex space-x-2">
						<Button size="icon">
							<Link href={`/shop/edit/${shop._id}`}>
								<Pencil />
							</Link>
						</Button>
						<Button
							size="icon"
							onClick={() => deleteShop(shop._id)}
						>
							<Trash2 />
						</Button>
					</div> */}
					</div>
				);
			})}
		</div>
	);
};

export default ShopList;
