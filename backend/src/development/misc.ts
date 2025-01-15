import productsData from "./products.json"
import {Product, Iproducts} from "../models/productSchema"


const copyDataToDataBase = async () =>  {
  Product.collection.deleteMany({})
  productsData.products.forEach((item, index) => {
    let productData : Iproducts = {
      numberId: index,
      ...item
    }
    
    let product = new Product<Iproducts>(productData)
    product.save().then(data => console.log(data))
  });
}

export default{copyDataToDataBase}
