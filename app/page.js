"use client";
import ShopList from "@/components/ShopList";
import { Button } from "@/components/ui/button";
import { useShops } from "@/hooks/useShops";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	const { shops } = useShops();
	const itemsToBuyCount = shops.filter((shop) => shop.tobuy).length;

	return (
		<>
			<div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-size-h3 text-center mb-8 text-white font-title">
						Shop List
					</h1>
					{itemsToBuyCount ? (
						<ShopList pageType="shoppingList" />
					) : (
						<div className="flex flex-col items-center justify-center py-6 gap-5">
							<Image
								src={`/images/empty-cart.png`}
								width={300}
								height={200}
								// style={{ width: "500px", height: "300px", objectFit: "cover" }}
								alt="Panier vide"
								quality={75}
							/>
							<div className="flex items-center gap-3">
								<div>Aucun produit à acheter !</div>
								<Button>
									<Link href="/inventaire">Ajouter</Link>
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
