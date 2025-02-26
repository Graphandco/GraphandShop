import { useContext } from "react";
import CategoryContext from "@/context/CategoryContext";

export const useCategories = () => {
	const context = useContext(CategoryContext);
	if (!context) {
		throw new Error("useShops doit être utilisé dans un ShopProvider");
	}
	return context;
};
