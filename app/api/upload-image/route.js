import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
	const formData = await request.formData();
	const file = formData.get("image");

	if (!file) {
		return NextResponse.json({
			success: false,
			message: "Aucun fichier reçu",
		});
	}

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	const uploadDir = path.join(process.cwd(), "public/images/items");
	if (!fs.existsSync(uploadDir)) {
		fs.mkdirSync(uploadDir, { recursive: true });
	}

	const filePath = path.join(uploadDir, file.name);

	try {
		fs.writeFileSync(filePath, buffer);
		return NextResponse.json({ success: true, imagePath: file.name });
	} catch (error) {
		console.error("Erreur lors de l'upload :", error);
		return NextResponse.json({
			success: false,
			message: `Erreur lors de l'upload : ${error}`,
		});
	}
}
