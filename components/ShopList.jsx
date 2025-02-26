"use client";
import { useShops } from "@/hooks/useShops";
import { FaTrash, FaEdit } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ShopList = () => {
	const { shops, setShops, deleteShop } = useShops();
	return (
		<div className="space-y-4">
			{shops?.map((shop) => (
				<div
					key={shop._id}
					className=" p-4 rounded-lg  flex items-center justify-between"
				>
					<div>
						<h3 className="text-lg font-semibold">{shop.title}</h3>
						<h3 className="font-semibold">{shop.category?.name}</h3>
						<p className="text-gray-600">
							{shop.tobuy ? "Inventaire" : "Liste"}
						</p>
					</div>
					<div className="flex space-x-2">
						<Button>
							<Link href={`/shop/edit/${shop._id}`}>
								<FaEdit />
							</Link>
						</Button>
						<Button onClick={() => deleteShop(shop._id)}>
							<FaTrash />
						</Button>
					</div>
				</div>
			))}
		</div>
	);
};

export default ShopList;
