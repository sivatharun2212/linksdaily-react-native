import express from "express";
import { signup, login, forgotPassword, verifyUser, validateOtp, resetPassword, sendOtp } from "../controllers/authController.js";

//router initialization
const authRouter = express.Router();

//auth routes
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/verify-user", verifyUser);
authRouter.post("/validate-otp", validateOtp);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/send-otp", resetPassword);

export default authRouter;
