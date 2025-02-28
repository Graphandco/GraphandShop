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
			incart = false,
			favorite = false,
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
			incart,
			favorite,
			favorite,
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
// Update
export async function PUT(request) {
	try {
		await connectDB();

		// Vérification du body
		const body = await request.json();
		if (!body.id) {
			return NextResponse.json(
				{ error: "L'ID est requis" },
				{ status: 400 }
			);
		}

		const { id, ...updateFields } = body; // Sépare l'ID des autres champs

		// Vérifie qu'il y a bien des champs à mettre à jour
		if (Object.keys(updateFields).length === 0) {
			return NextResponse.json(
				{ error: "Aucun champ à mettre à jour" },
				{ status: 400 }
			);
		}

		// Met à jour uniquement les champs fournis
		const updatedShop = await Shop.findByIdAndUpdate(id, updateFields, {
			new: true,
		});

		if (!updatedShop) {
			return NextResponse.json(
				{ error: "Shop non trouvé" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			message: "Shop mis à jour avec succès",
			shop: updatedShop,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Erreur serveur", details: error.message },
			{ status: 500 }
		);
	}
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
