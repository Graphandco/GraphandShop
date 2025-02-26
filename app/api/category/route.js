import connectDB from "@/lib/database";
import Category from "@/models/Category.model";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Create Shop
export async function POST(request) {
	try {
		const { name } = await request.json();
		await connectDB();

		// Créer le shop en associant la catégorie
		const category = await Category.create({
			name,
		});

		return NextResponse.json({
			message: "Category created successfully",
			category,
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
		const categories = await Category.find();

		return NextResponse.json({ categories });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
// Update Shop
export async function PUT(request) {
	const { name } = await request.json();
	await connectDB();
	const updatedCategory = await Category.findByIdAndUpdate(
		id,
		{ name },
		{ new: true }
	);
	return NextResponse.json({
		message: "Shop updated successfully",
		category: updatedCategory,
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
		const deletedCategory = await Category.findByIdAndDelete(id);

		if (!deletedCategory) {
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
