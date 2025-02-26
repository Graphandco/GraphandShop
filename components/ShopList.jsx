"use client";
import { useShops } from "@/hooks/useShops";
import { FaTrash, FaEdit } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ShopList = () => {
	const { shops, deleteShop } = useShops();
	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
			{shops?.map((shop) => (
				<div
					key={shop._id}
					className="bg-card p-4 grid items-center justify-between rounded-lg"
				>
					<div>
						<h3 className="text-lg font-semibold">{shop.title}</h3>
						<h3 className="text-size-small">
							{shop.category?.name}
						</h3>
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
