"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditTodo() {
	const [shop, setShop] = useState({ title: "" });
	const router = useRouter();
	const { id } = useParams();
	console.log(id);
	// Fetch shop by ID
	const fetchShop = async () => {
		try {
			const response = await fetch(`/api/Shop/${id}`);
			const data = await response.json();
			setShop(data.shop);
		} catch (error) {
			toast.error("Failed to fetch shop");
		}
	};

	// Update todo
	const updateShop = async () => {
		if (!shop.title) {
			toast.error("Title is required");
			return;
		}
		try {
			const response = await fetch("/api/Shop", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id, ...shop }),
			});
			const data = await response.json();
			toast.success("Shop updated successfully");
			router.push("/");
		} catch (error) {
			toast.error("Failed to update shop");
		}
	};

	useEffect(() => {
		fetchShop();
	}, [id]);

	return (
		<div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
			<ToastContainer />
			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold text-center mb-8">
					Edit Todo
				</h1>
				x{/* Edit Todo Form */}
				<div className="bg-white p-6 rounded-lg shadow-md mb-8">
					<div className="space-y-4">
						<input
							type="text"
							placeholder="Title"
							value={shop.title}
							onChange={(e) =>
								setShop({ ...shop, title: e.target.value })
							}
							className="w-full p-2 border rounded-lg"
						/>
						<button
							onClick={updateShop}
							className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
						>
							Update Shop
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
