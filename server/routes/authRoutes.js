import express from "express";
const authRouter = express.Router();
import { signup, login, forgotPassword, verifyUser } from "../controllers/authController.js";

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/verify-user", verifyUser);
export default authRouter;
