import express from "express";
import validateUserToken from "../middleware/validateUserToken.js";
import { uploadImage, updateName, updatePassword } from "../controllers/userController.js";
//router initialization
const userRouter = express.Router();

//user routes
userRouter.post("/upload-image", validateUserToken, uploadImage);
userRouter.put("/update-name", validateUserToken, updateName);
userRouter.put("/update-password", validateUserToken, updatePassword);
export default userRouter;
