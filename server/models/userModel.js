import mongoose from "mongoose";

const schema = {
	image: {
		uri: {
			type: String,
			required: true,
		},
		public_id: {
			type: String,
			required: true,
		},
	},
};

const userSchema = mongoose.Schema(schema, { timestamps: true });

export const userModel = mongoose.model("User", userSchema);
