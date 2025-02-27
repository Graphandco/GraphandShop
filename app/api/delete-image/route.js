import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function DELETE(req) {
	try {
		const { searchParams } = new URL(req.url);
		const imageName = searchParams.get("image");

		if (!imageName) {
			return NextResponse.json(
				{ success: false, error: "Nom de l'image manquant" },
				{ status: 400 }
			);
		}

		const imagePath = path.join(
			process.cwd(),
			"public/images/items",
			imageName
		);

		// Vérifier si le fichier existe
		if (!fs.existsSync(imagePath)) {
			return NextResponse.json(
				{ success: false, error: "Fichier introuvable" },
				{ status: 404 }
			);
		}

		// Supprimer l'image
		fs.unlinkSync(imagePath);

		return NextResponse.json({ success: true, message: "Image supprimée" });
	} catch (error) {
		console.error("Erreur lors de la suppression :", error);
		return NextResponse.json(
			{ success: false, error: "Erreur serveur" },
			{ status: 500 }
		);
	}
}
