import express from "express"
import { unknownEndpoint } from "./utils/middleware"
import {productRouter} from "./controllers/productRoutes"
import {MONGODB_URL} from "./utils/config";
import cors from "cors"
import mongoose from "mongoose";

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/products", productRouter)
app.use(unknownEndpoint)

mongoose.set("strictQuery", true)
mongoose.connect(MONGODB_URL) 
  .then(_result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log(MONGODB_URL);
    console.log('error connecting to MongoDB:', error.message)
  })

export {app}