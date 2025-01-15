import mongoose from "mongoose"

interface Iproducts {
  numberId: number,
  name: string,
  price: number,
  description: string,
  category: string,
  brand: string,
  "operating system": string,
  "storage capacity": number,
  "camera type": string,
  "battery capacity": number,
}

const productSchema = new mongoose.Schema<Iproducts>({
  name: {type: String, required: true},
  numberId: {type: Number, requiredPaths: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  brand: {type: String, required: true},
  "operating system": {type: String, required: true},
  "storage capacity": {type: Number, required: true},
  "camera type": {type: String, required: true},
  "battery capacity": {type: Number, required: true},
}) 
productSchema.set("toJSON", {
  virtuals: true
});

/* ensures that query with invalid filter like:
find({xxx: "test"}) doesn't get converted to:
find({}) and return all objects */
productSchema.set("strictQuery", false)

const Product: mongoose.Model<Iproducts> = mongoose.model<Iproducts>("products", productSchema) 
export {Product, Iproducts}