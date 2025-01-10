import mongoose from "mongoose"

interface Iproducts {
  numberId: number,
  name: string,
  price: number,
  description: string,
  category: string,
  brand: string,
  operatingSystem: string,
  storageCapacity: number,
  cameraFeatures: string,
  batteryCapacity: number,
}

const productSchema = new mongoose.Schema<Iproducts>({
  name: {type: String, required: true},
  numberId: {type: Number, requiredPaths: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  brand: {type: String, required: true},
  operatingSystem: {type: String, required: true},
  storageCapacity: {type: Number, required: true},
  cameraFeatures: {type: String, required: true},
  batteryCapacity: {type: Number, required: true},
}) 
productSchema.set('toJSON', {
  virtuals: true
});

//ensures that query with invalid filter like:
//find({xxx: "test"}) doesn't get converted to:
//find({}) and return all objects
productSchema.set("strictQuery", false)

const Product: mongoose.Model<Iproducts> = mongoose.model<Iproducts>("products", productSchema) 
export {Product, Iproducts}