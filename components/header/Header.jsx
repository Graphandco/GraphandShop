"use client";
import Link from "next/link";
import { FaBasketShopping } from "react-icons/fa6";
import { GiShop } from "react-icons/gi";
import { usePathname } from "next/navigation";

const Header = () => {
	const pathname = usePathname();

	return (
		<header className="bg-white text-background">
			<div className="container p-5 mx-auto flex gap-3">
				{pathname === "/" && (
					<Link href="/inventaire">
						<GiShop />
					</Link>
				)}
				{pathname === "/inventaire" && (
					<Link href="/">
						<FaBasketShopping />
					</Link>
				)}
				<Link href="/">Accueil</Link>
				<Link href="/upload">Upload</Link>
			</div>
		</header>
	);
};

export default Header;
