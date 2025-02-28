"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function UploadPage() {
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
			<h1 className="text-2xl font-bold">Uploader une Image</h1>
			<div className="flex w-full max-w-sm items-center space-x-2">
				<input
					type="file"
					placeholder="Sélectionnez l'image"
					onChange={handleFileChange}
				/>
				<Button onClick={handleUpload}>Envoyer</Button>
			</div>

			<h2 className="text-xl font-bold mt-6">Images Uploadées</h2>
			<div className="flex flex-wrap my-6">
				{images.map((image, index) => {
					if (image === ".DS_Store") return null;
					return (
						<div key={index} className="flex flex-col items-center">
							<Image
								src={`/images/items/${image}`}
								width={50}
								height={50}
								alt={image}
								className="p-1"
							/>

							<Button
								size="icon"
								className="mt-2"
								onClick={() => handleDeleteImage(image)}
							>
								<Trash2 />
							</Button>
						</div>
					);
				})}
			</div>
		</>
	);
}
