import productsData from "./products.json"
import {Product, Iproducts} from "../models/productSchema"
import mongoose from "mongoose";


const copyDataToDataBase = async () =>  {
  Product.collection.deleteMany({})
  productsData.products.forEach(item => {
    let product = new Product<Iproducts>(item)
    product.save().then(data => console.log(data))
  });
}

export default{copyDataToDataBase}
