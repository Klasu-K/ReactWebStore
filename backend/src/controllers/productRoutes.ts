import {Router} from "express"
import {Product, Iproducts} from "../models/productSchema"

const productRouter = Router()

productRouter.get('/:id', (req, res) => {
  const id = req.params.id
  Product.findById(id)
  .then(item => res.send(item))
  .catch(_e => console.error(`coudl not get object by id ${id}`))
})

productRouter.post('', async (req, res) => {
  const body: IproductQuery = req.body
  const page = body.page
  const pageSize = body.pageSize
  //get paginated products
  let products = await Product.find()
    .sort({name: 1})
    .skip(page*pageSize)
    .limit(pageSize)
    .catch(e => {throw e})

  res.send(products)
})

export {productRouter}

