import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dbconnection from "./config/dbConnection.js";

//dotenv configuration
dotenv.config();

//express initialization
const app = express();

//mongoDB connection
dbconnection();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

//express listening
app.listen(5000, () => {
	console.log("server is running on port 5000");
});
