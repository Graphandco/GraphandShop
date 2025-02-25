import connectDB from "@/lib/database";
import Shop from "@/models/Shop.model";
import { NextResponse } from "next/server";

// Create Shop
export async function POST(request) {
	const { title, tobuy = false } = await request.json();
	await connectDB();
	const shop = await Shop.create({ title, tobuy });
	return NextResponse.json({
		message: "Shop created successfully",
		shop: shop,
	});
}

// Read all Shops
export async function GET() {
	await connectDB();
	const shops = await Shop.find();
	return NextResponse.json({
		shops: shops,
	});
}
// Update Shop
export async function PUT(request) {
	const { id, title, tobuy } = await request.json();
	await connectDB();
	const updatedShop = await Shop.findByIdAndUpdate(
		id,
		{ title, tobuy },
		{ new: true }
	);
	return NextResponse.json({
		message: "Shop updated successfully",
		shop: updatedShop,
	});
}

// Delete Shop
export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get("id");
	await connectDB();
	await Shop.findByIdAndDelete(id);
	return NextResponse.json({
		message: "Shop deleted successfully",
	});
}
