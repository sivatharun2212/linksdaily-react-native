import { authModel } from "../models/authModule.js";
import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const signup = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const userExists = await authModel.findOne({ email });
		if (userExists) {
			res.status(409).json({ status: "failed", message: "user already exists!" });
		} else {
			const hashedPassword = await hash(password, 10);
			const user = await authModel.create({
				name,
				email,
				password: hashedPassword,
			});
			if (user) {
				res.status(201).json({ status: "success", message: "sign up successful" });
			} else {
				res.status(500).json({ status: "error", message: "Failed to create user" });
			}
		}
	} catch (err) {
		res.status(500).json({ status: "error", message: err.message });
		console.log(err.message);
	}
};

export const login = async (req, res) => {};
