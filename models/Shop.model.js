import mongoose, { Schema } from "mongoose";

const ShopSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	tobuy: {
		type: Boolean,
		default: false, // Ajoute une valeur par défaut
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category", // Référence au modèle "Category"
		// required: true,
	},
});

const Shop = mongoose.models.Shop || mongoose.model("Shop", ShopSchema);

export default Shop;
