import express from "express"
import { unknownEndpoint } from "./src/utils/middleware"
import {productRouter} from "./src/controllers/productRoutes"
import {MONGODB_URL} from "./src/utils/config";
import cors from "cors"
import mongoose from "mongoose";
import coloredConsole from "./src/utils/coloredConsole"

const app = express()
app.use(cors()) //TODO remove in production
app.use(express.json())
app.use("/api/products", productRouter)
app.use(unknownEndpoint)

mongoose.set("strictQuery", true)
mongoose.connect(MONGODB_URL) 
  .then(_result => {
    coloredConsole.log("connected to MongoDB", coloredConsole.TextColor.Green)
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

export {app}