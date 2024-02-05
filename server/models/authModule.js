import mongoose from "mongoose";

const schema = {
	name: {
		type: String,
		required: [true, "please add the Name"],
	},
	email: {
		type: String,
		required: [true, "please add email"],
	},
	password: {
		type: String,
		required: [true, "please add password"],
	},
};

const authSchema = mongoose.Schema(schema, { timestamps: true });

export const authModel = mongoose.model("Users", authSchema);
