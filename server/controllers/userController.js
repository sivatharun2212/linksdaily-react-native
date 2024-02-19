import { userModel } from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import { nanoid } from "nanoid";
import { hash, compare } from "bcrypt";
// cloudinary configuration
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

//upload-image api
//post
export const uploadImage = async (req, res) => {
	const { email } = req.user;
	console.log("started");

	try {
		console.log("tried");
		const uploadResult = await cloudinary.uploader.upload(req.body.image, {
			public_id: nanoid(),
			// resource_type: "jpg",
		});
		console.log("uploaded");
		const user = await userModel.findOne({ email });
		user.image.public_id = uploadResult.public_id;
		user.image.url = uploadResult.secure_url;
		await user.save();
		console.log("saved");
		if (user.image.public_id !== "" && user.image.secure_url !== "") {
			const { password, ...rest } = user._doc;
			res.status(200).json({ status: "success", message: "image uploaded", userData: rest });
		}
		console.log("sent");
		console.log("uploadResult", uploadResult);
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
};

//update-name api
//put request

export const updateName = async (req, res) => {
	const { name } = req.body;
	const { _id } = req.user;
	try {
		const updatedUser = await userModel.findByIdAndUpdate(_id, { name }, { new: true });
		if (updatedUser) {
			res.status(200).json({ ststus: "success", message: "Name Updated", userData: updatedUser });
		} else {
			res.status(500).json({ status: "failed", message: "failed to update the name" });
		}
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
};

//update-password api
//put request
export const updatePassword = async (req, res) => {
	const { _id, email } = req.user;
	const { oldPassword, newPassword } = req.body;
	try {
		//ckeck old password
		const user = await userModel.findOne({ email });
		const hashedOldPassword = await hash(oldPassword, 10);

		if (user && hashedOldPassword === user.password) {
			const hashedNewPassword = await hash(newPassword, 10);
			const updatedUser = await userModel.findByIdAndUpdate(_id, { password: hashedNewPassword }, { new: true });
			if (updatedUser) {
				res.status(200).json({ status: "success", message: "password updated", userData: updatedUser });
			} else {
				res.status(500).json({ status: "failed", message: "failed to update the password" });
			}
		} else {
			res.status(500).json({ status: "failed", message: "incorrect old password" });
		}
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
};
