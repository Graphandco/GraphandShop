import mongoose, { Schema } from "mongoose";

const ShopSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	incart: {
		type: Boolean,
		default: false,
	},
	tobuy: {
		type: Boolean,
		default: false,
	},
	favorite: {
		type: Boolean,
		default: false,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
		// required: true,
	},
	image: { type: String, default: "" },
});

const Shop = mongoose.models.Shop || mongoose.model("Shop", ShopSchema);

export default Shop;
