import {Router} from "express"
import productsData from "../development/products.json"
import {Product, Iproducts} from "../models/productSchema"

const productRouter = Router()

productRouter.get('/:id', (req, res) => {
  const id = req.params.id
  Product.findById(id)
  .then(item => res.send(item))
  .catch(_e => console.error(`coudl not get object by id ${id}`))
})

productRouter.post('', async (req, res) => {
  const page : number = req.body.page
  const pageSize: number = req.body.pageSize
  console.log("pagesize:", pageSize)
  console.log("page:", page)
  console.log(req.body)

  //get paginated products
  let products = await Product.find()
    .sort({name: 1})
    .skip(page*pageSize)
    .limit(pageSize)
    .catch(e => {throw e})

  res.send(products)
})

export {productRouter}

