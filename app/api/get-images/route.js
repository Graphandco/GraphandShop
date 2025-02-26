import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
	try {
		const imageDir = path.join(process.cwd(), "public/images/items");
		const files = fs.readdirSync(imageDir);
		return NextResponse.json({ images: files });
	} catch (error) {
		console.error("Erreur lors de la récupération des images :", error);
		return NextResponse.json({ images: [] });
	}
}
