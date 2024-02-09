import { authModel } from "../models/authModule.js";
import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { sendEmail } from "../services/emailService.js";

export const verifyUser = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await authModel.findOne({ email });
		if (user) {
			res.status(200).json({ status: "success", message: "user verified", registeredUserEmail: user.email });
		} else {
			res.status(400).json({ status: "failure", message: "user is not registered" });
		}
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
};

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
			const token = jsonwebtoken.sign({ _id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });

			if (user) {
				const { password, ...rest } = user._doc;
				res.status(201).json({ status: "success", message: "sign up successful", token, userData: rest });
			} else {
				res.status(500).json({ status: "error", message: "Failed to create user" });
			}
		}
	} catch (err) {
		res.status(500).json({ status: "error", message: err.message });
		console.log(err.message);
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const userExists = await authModel.findOne({ email });
		if (!userExists) {
			res.status(400).json({ status: "failure", message: "User not found!" });
		} else {
			const passwordMatch = await compare(password, userExists.password);
			if (!passwordMatch) {
				res.status(401).json({ status: "Unauthorized", message: "wrong password!" });
			} else {
				const token = jsonwebtoken.sign({ _id: userExists._id, email: userExists.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
				const { password, ...rest } = userExists._doc;
				res.status(200).json({ status: "success", message: "login successful", token, userData: rest });
			}
		}
	} catch (err) {
		res.status(500).json({ status: "error", message: err.message });
	}
};

export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await authModel.findOne({ email });
		if (!user) {
			res.status(400).json({ status: "failure", message: "user not found!" });
		}
		const emailOtp = await sendEmail(email);

		if (emailOtp) {
			console.log(emailOtp);
			user.resetCode = emailOtp.otp;
			await user.save();
			res.status(200).json({ status: "success", message: `OTP sent to ${email}` });
		}
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
};

export const validateOtp = async (req, res) => {
	const { otp, email } = req.body;
	try {
		const user = await authModel.findOne({ email });
		if (user && user.resetCode === otp) {
			res.status(200).json({ status: "success", message: "otp verified" });
		} else {
			res.status(400).json({ status: "failure", message: "otp not verified" });
		}
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
};

export const resetPassword = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await authModel.findOne({ email });
		if (user) {
			const hashedPassword = hash(password, 10);
			user.password = hashedPassword;
			await user.save();
			res.status(200).json({ status: "success", message: "password changed" });
		}
	} catch (error) {
		res.status(500).json({ status: "error", message: error.message });
	}
};
