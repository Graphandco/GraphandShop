"use client";
import { useShops } from "@/hooks/useShops";

import React from "react";

const Inventaire = () => {
	const { shops, setShops, loading, error } = useShops();
	const inventaireShops = shops?.filter((shop) => shop.tobuy === false);

	return (
		<>
			<div>
				{inventaireShops?.map((shop) => (
					<div key={shop._id}>{shop.title}</div>
				))}
			</div>
		</>
	);
};

export default Inventaire;
