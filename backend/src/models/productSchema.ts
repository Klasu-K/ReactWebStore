import mongoose from "mongoose"

interface Iproducts {
  name: string,
  price: number,
  description: string,
}

const productSchema = new mongoose.Schema<Iproducts>({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
}) 
productSchema.set('toJSON', {
  virtuals: true
});

const Product: mongoose.Model<Iproducts> = mongoose.model<Iproducts>("products", productSchema) 
export {Product, Iproducts}