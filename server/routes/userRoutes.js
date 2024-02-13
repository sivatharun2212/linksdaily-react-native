import express from "express";
import validateUserToken from "../middleware/validateUserToken.js";
import { uploadImage, updateName } from "../controllers/userController.js";
//router initialization
const userRouter = express.Router();

//user routes
userRouter.post("/upload-image", validateUserToken, uploadImage);
userRouter.put("/update-name", validateUserToken, updateName);
export default userRouter;
