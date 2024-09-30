import express from "express"
import { unknownEndpoint } from "./utils/middleware"
import {productRouter} from "./controllers/products"
import cors from "cors"
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/products", productRouter)
app.use(unknownEndpoint)



export {app}