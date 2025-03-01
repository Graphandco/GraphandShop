"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ImagesList from "./ImagesList";

export default function GestionImages() {
	const [images, setImages] = useState([]);
	const [selectedFile, setSelectedFile] = useState(null);

	// Charger les images du dossier
	useEffect(() => {
		const fetchImages = async () => {
			const response = await fetch("/api/get-images");
			const data = await response.json();
			setImages(data.images);
		};

		fetchImages();
	}, []);

	// Gestion de la sélection de fichier
	const handleFileChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			setSelectedFile(event.target.files[0]);
		}
	};

	// Envoi du fichier au serveur
	const handleUpload = async () => {
		if (!selectedFile) {
			toast.warning("Veuillez sélectionner une image");
			return;
		}

		const formData = new FormData();
		formData.append("image", selectedFile);

		const response = await fetch("/api/upload-image", {
			method: "POST",
			body: formData,
		});

		const data = await response.json();
		if (data.success) {
			toast.success("Image uploadée avec succès !");
			setImages((prev) => [...prev, data.imagePath]); // Mise à jour de la liste
		} else {
			toast.error("Échec de l'upload");
		}
	};

	// Supprimer une image
	const handleDeleteImage = async (imageName) => {
		const response = await fetch(`/api/delete-image?image=${imageName}`, {
			method: "DELETE",
		});

		const data = await response.json();
		if (data.success) {
			toast.success("Image supprimée !");
			setImages((prev) => prev.filter((img) => img !== imageName));
		} else {
			toast.error("Échec de la suppression");
		}
	};

	return (
		<>
			<h1 className="">Uploader une Image</h1>
			<div className="flex w-full flex-wrap items-center gap-2">
				<input
					type="file"
					placeholder="Sélectionnez l'image"
					onChange={handleFileChange}
					className="max-w-full"
				/>
				<Button onClick={handleUpload}>Envoyer</Button>
			</div>

			<div className="bg-card p-5 rounded-lg mt-5">
				<p className="font-bold">Images Uploadées</p>
				<div className="grid grid-cols-[repeat(auto-fit,minmax(75px,1fr))] my-4">
					{images.map((image, index) => {
						if (image === ".DS_Store") return null;
						return (
							<ImagesList
								key={index}
								image={image}
								handleDeleteImage={handleDeleteImage}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}
