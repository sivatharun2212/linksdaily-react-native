import mongoose from "mongoose";

//authentication schema
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
	resetCode: {
		type: String,
	},
	role: {
		type: String,
	},
	image: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
};

const userSchema = mongoose.Schema(schema, { timestamps: true });

export const userModel = mongoose.model("User", userSchema);
