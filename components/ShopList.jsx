"use client";
import { useShops } from "@/hooks/useShops";
import { useCategories } from "@/hooks/useCategories";
import ShopItem from "./ShopItem";

const ShopList = () => {
	const { shops } = useShops();
	const { categories } = useCategories();
	return (
		<section className="shoplist">
			{categories.map((cat) => (
				<div key={cat._id} className="mt-8">
					{/* On affiche le titre uniquement si la catégorie contient des éléments */}
					{shops?.filter((shop) => shop.category?._id === cat._id)
						.length > 0 && (
						<div className="font-title text-size-h4 text-primary p-2 my-2">
							{cat.name}
						</div>
					)}

					{/* <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4"> */}
					<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
						{shops
							?.filter((shop) => shop.category?._id === cat._id)
							.map((shop) => {
								return <ShopItem key={shop._id} shop={shop} />;
							})}
					</div>
				</div>
			))}
		</section>
	);
};

export default ShopList;
