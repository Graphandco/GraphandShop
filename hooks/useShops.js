import { useContext } from "react";
import ShopContext from "@/context/ShopContext";

export const useShops = () => {
	const context = useContext(ShopContext);
	if (!context) {
		throw new Error("useShops doit être utilisé dans un ShopProvider");
	}
	return context;
};
