import express from "express";
const authRouter = express.Router();
import { signup, login } from "../controllers/authController.js";

authRouter.post("/signup", signup);
authRouter.post("/login", login);

export default authRouter;
