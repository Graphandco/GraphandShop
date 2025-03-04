"use client";
import ShopList from "@/components/ShopList";
import { Button } from "@/components/ui/button";
import { useShops } from "@/hooks/useShops";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Home() {
	const { shops } = useShops();
	const itemsToBuyCount = shops.filter((shop) => shop.tobuy).length;

	const { status } = useSession();

	const showSession = () => {
		if (status === "authenticated") {
			return (
				<button
					className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white"
					onClick={() => {
						signOut();
					}}
				>
					Logout here
				</button>
			);
		} else if (status === "loading") {
			return <span className="text-[#888] text-sm mt-7">Loading...</span>;
		} else {
			return (
				<Link
					href="/login"
					className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white"
				>
					Login here
				</Link>
			);
		}
	};

	return (
		<>
			<div className="">
				<h1 className="text-size-h3 text-center mb-8 text-white font-title">
					Shop List
				</h1>
				{showSession()}
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
		</>
	);
}
