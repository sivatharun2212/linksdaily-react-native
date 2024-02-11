import express from "express";
import validateUserToken from "../middleware/validateUserToken.js";
import { uploadImage } from "../controllers/authController.js";
const userRouter = express.Router();

userRouter.post("/upload-image", validateUserToken, uploadImage);

export default userRouter;
