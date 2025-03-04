import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
	{
		mail: {
			type: String,
			unique: true,
			// required: [true, "Email is required"],
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Email is invalid",
			],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			select: false,
		},
		name: {
			type: String,
			required: [true, "Fullname is required"],
			minLength: [3, "fullname must be at least 3 characters"],
			maxLength: [25, "fullname must be at most 25 characters"],
		},
		phone: {
			type: String,
			default: "",
		},
		image: { type: String, default: "" },
	},
	{
		timestamps: true,
	}
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
