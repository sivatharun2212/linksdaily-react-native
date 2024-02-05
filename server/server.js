import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import dbconnection from "./config/dbConnection.js";
dotenv.config();
const app = express();
dbconnection();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.listen(5000, () => {
	console.log("server is running on port 5000");
});
