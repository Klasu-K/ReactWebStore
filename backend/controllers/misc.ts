import productsData from "../development/products.json"
import {Product, Iproducts} from "../models/productSchema"

const copyDataToDataBase = () => {
  productsData.products.forEach(item => {
    let a = new Product<Iproducts>({
      name: item.name,
      price: item.price,
      description: item.description,
    })
    a.save().then(data => console.log(data))
  });
}
