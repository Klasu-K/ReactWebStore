import express from "express"
import { unknownEndpoint } from "./src/utils/middleware"
import {productRouter} from "./src/controllers/productRoutes"
import {MONGODB_URL} from "./src/utils/config";
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
    console.log('\x1b[32m connected to MongoDB \x1b[0m')
  })
  .catch((error) => {
    console.log(MONGODB_URL);
    console.log('error connecting to MongoDB:', error.message)
  })

export {app}