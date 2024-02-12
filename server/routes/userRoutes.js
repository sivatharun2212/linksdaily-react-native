import express from "express";
import validateUserToken from "../middleware/validateUserToken.js";
import { uploadImage } from "../controllers/userController.js";
//router initialization
const userRouter = express.Router();

//user routes
userRouter.post("/upload-image", validateUserToken, uploadImage);

export default userRouter;
