import mongoose, { Schema } from "mongoose";

const ShopSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	tobuy: {
		type: Boolean,
	},
});

const Shop = mongoose.models.Shop || mongoose.model("Shop", ShopSchema);

export default Shop;
