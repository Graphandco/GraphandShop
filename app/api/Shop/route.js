import connectDB from "@/lib/database";
import Shop from "@/models/Shop.model";
import Category from "@/models/Category.model";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// ✅ Lire les fichiers d'images dans /public/images/items
import fs from "fs";
import path from "path";

// 📌 Ajouter un shop avec une image
export async function POST(request) {
	try {
		const {
			title,
			tobuy = false,
			category = "Divers",
			image = "",
		} = await request.json();

		await connectDB();

		// Vérifier si la catégorie existe déjà
		let existingCategory = await Category.findOne({ name: category });

		// Si elle n'existe pas, la créer
		if (!existingCategory) {
			existingCategory = await Category.create({ name: category });
		}

		// Créer le shop en associant l'image
		const shop = await Shop.create({
			title,
			tobuy,
			category: existingCategory._id,
			image, // ✅ Enregistrement de l'image
		});

		revalidatePath("/");

		return NextResponse.json({ message: "Shop créé avec succès", shop });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// 📌 Lire les shops et leurs images
export async function GET() {
	try {
		await connectDB();
		const shops = await Shop.find().populate("category").exec();

		// ✅ Lire les images depuis le dossier
		const imagesDir = path.join(process.cwd(), "public/images/items");
		const images = fs.readdirSync(imagesDir);

		return NextResponse.json({ shops, images });
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
