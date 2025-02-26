import connectDB from "@/lib/database";
import Shop from "@/models/Shop.model";
import Category from "@/models/Category.model";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Create Shop
export async function POST(request) {
	try {
		const {
			title,
			tobuy = false,
			category = "Divers",
		} = await request.json();

		await connectDB();

		// Vérifier si la catégorie existe déjà
		let existingCategory = await Category.findOne({ name: category });

		// Si elle n'existe pas, la créer
		if (!existingCategory) {
			existingCategory = await Category.create({ name: category });
		}

		// Créer le shop en associant la catégorie
		const shop = await Shop.create({
			title,
			tobuy,
			category: existingCategory._id, // Stocker l'ObjectId
		});

		revalidatePath("/");

		return NextResponse.json({
			message: "Shop created successfully",
			shop,
		});
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Read all Shops
export async function GET() {
	try {
		await connectDB();

		// Récupérer les shops et inclure les détails de la catégorie associée
		const shops = await Shop.find().populate("category").exec();

		return NextResponse.json({ shops });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
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
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json({ error: "ID manquant" }, { status: 400 });
		}

		await connectDB();
		const deletedShop = await Shop.findByIdAndDelete(id);

		if (!deletedShop) {
			return NextResponse.json(
				{ error: "Shop introuvable" },
				{ status: 404 }
			);
		}

		// ✅ Invalider le cache côté serveur
		revalidatePath("/");

		return NextResponse.json(
			{ message: "Shop supprimé avec succès" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Erreur de suppression:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la suppression" },
			{ status: 500 }
		);
	}
}
