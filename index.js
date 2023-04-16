import express, { Router } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import productRouter from './Routes/productRoute.js';
import categoryRouter from "./Routes/categoryRoute.js";
import userRouter from "./Routes/userRoute.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT;
const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());
app.use('/product' , productRouter)
app.use('/category' , categoryRouter)
app.use('/user' , userRouter)
app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`)
);
