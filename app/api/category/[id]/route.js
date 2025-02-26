import connectDB from "@/lib/database";
import Shop from "@/models/Shop.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const { id } = await params;
	console.log(id);
	await connectDB();
	const shop = await Shop.findById(id);
	console.log(shop);
	return NextResponse.json({
		shop: shop,
	});
}
