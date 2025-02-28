"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import Image from "next/image";

const ImagesList = ({ image, handleDeleteImage }) => {
	const [deleteImage, setDeleteImage] = useState(false);

	return (
		<div
			className={`${
				deleteImage && "image-to-delete"
			} p-1 my-2 flex flex-col justify-center items-center gap-1 text-center cursor-pointer relative`}
			onClick={() => setDeleteImage((prev) => !prev)}
		>
			<Image
				src={`/images/items/${image}`}
				width={30}
				height={30}
				alt={image}
			/>
			<div className="image-name text-[0.7rem] capitalize">
				{image.split(".")[0].replace(/_/g, " ")}
			</div>
			{deleteImage && (
				<div className="absolute inset-0 grid place-items-center">
					<Trash2
						size={28}
						// color="var(--primary)"
						onClick={() => handleDeleteImage(image)}
						className="text-red-500"
					/>
				</div>
			)}

			{/* <Button
								size="icon"
								className="mt-2"
								onClick={() => handleDeleteImage(image)}
							>
							</Button> */}
		</div>
	);
};

export default ImagesList;
