"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderBurger from "./HeaderBurger";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
	const pathname = usePathname();

	return (
		<header className="bg-primary">
			{/* <HeaderBurger /> */}
			{/* <HeaderMenu /> */}
			{/* <div className="wrapper flex flex-wrap gap-3 text-white">
				<Link href="/">Accueil</Link>
				<Link href="/inventaire">Inventaire</Link>
				<Link href="/shop/add">Ajouter</Link>
				<Link href="/upload">Upload</Link>
				<Link href="/category/add">Catégories</Link>
			</div> */}
		</header>
	);
};

export default Header;
