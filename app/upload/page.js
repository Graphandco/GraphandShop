"use client";

import { useState, useEffect } from "react";

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
			alert("Veuillez sélectionner une image.");
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
			alert("Image uploadée avec succès !");
			setImages((prev) => [...prev, data.imagePath]); // Mise à jour de la liste
		} else {
			alert("Échec de l'upload.");
		}
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">Uploader une Image</h1>
			<input type="file" onChange={handleFileChange} className="my-4" />
			<button
				onClick={handleUpload}
				className="bg-blue-500 text-white px-4 py-2"
			>
				Upload
			</button>

			<h2 className="text-xl font-bold mt-6">Images Uploadées</h2>
			<div className="grid grid-cols-3 gap-4 mt-4">
				{images.map((image, index) => (
					<img
						key={index}
						src={`/images/items/${image}`}
						alt="Uploaded"
					/>
				))}
			</div>
		</div>
	);
}
