import { userModel } from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import { nanoid } from "nanoid";

// cloudinary configuration
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export const uploadImage = async (req, res) => {
	// const { _id, email } = req.user;

	try {
		const uploadResult = await cloudinary.uploader.upload(req.body.image, {
			public_id: nanoid(),
			// resource_type: "jpg",
		});
		res.status(200).json({ status: "success", message: "image uploaded", uploadResult });
		console.log("uploadResult", uploadResult);
	} catch (error) {
		res.status(500).json({ status: "error", message: error });
	}
};

// uploadResult {
// 	asset_id: 'f061eac3c1ce33c7dee10aace4ddd55b',
// 	public_id: 'FkMVCU5LhDAYZZpU4c-ye',
// 	version: 1707672630,
// 	version_id: 'ce41d2fab64495a8f7d66eae0a7e8feb',
// 	signature: 'dbaf0edd0565f4719380913499cc19998924f5a7',
// 	width: 1080,
// 	height: 1080,
// 	format: 'jpg',
// 	resource_type: 'image',
// 	created_at: '2024-02-11T17:30:30Z',
// 	tags: [],
// 	bytes: 31934,
// 	type: 'upload',
// 	etag: 'ed24c9164e85aa3351f738b75572a727',
// 	placeholder: false,
// 	url: 'http://res.cloudinary.com/dpnzucco8/image/upload/v1707672630/FkMVCU5LhDAYZZpU4c-ye.jpg',
// 	secure_url: 'https://res.cloudinary.com/dpnzucco8/image/upload/v1707672630/FkMVCU5LhDAYZZpU4c-ye.jpg',
// 	folder: '',
// 	api_key: '113891742981529'
//   }
