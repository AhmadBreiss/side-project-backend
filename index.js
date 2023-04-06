import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();


connectDB();

const PORT = process.env.PORT;
const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(cors());

app.listen(
    PORT,
    console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`)
  );