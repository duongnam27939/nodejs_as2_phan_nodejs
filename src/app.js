import express from "express"
import mongoose from "mongoose"
import productsRoutes from "./router/products"
import authRouter from "./router/auth"
import category from "./router/category"
import cors from "cors"



const app = express();
app.use(express.json());
app.use(cors())

app.use("/api",productsRoutes)
app.use("/api",authRouter)
app.use("/api",category)




mongoose.connect("mongodb://127.0.0.1:27017/nodejs_ass")



export const viteNodeApp = app;
