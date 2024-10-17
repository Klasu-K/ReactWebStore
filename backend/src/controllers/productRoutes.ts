import {Router} from "express"
import {Product, Iproducts} from "../models/productSchema"
import misc from "../development/misc"


const productRouter = Router()

productRouter.get('/test', async (req, res) => {
  //used to test or exeute any functionality on runtime
  await misc.copyDataToDataBase()
  res.send()
})

productRouter.get('/:id', (req, res) => {
  const id = req.params.id
  Product.findById(id)
  .then(item => res.send(item))
  .catch(_e => console.error(`could not get object by id ${id}`))
})

productRouter.post('', async (req, res) => {
  const body: IproductQuery = req.body
  const {page, pageSize, sortBy, sortOrder,filters} = body


  const queryFilter = {
    $and:
      filters.map(filter => {
        return {[filter[0]]: {$in: filter[1]}}
      })
  }

  console.log(JSON.stringify(queryFilter))
  let products = await Product.find(queryFilter)
    .sort({[sortBy]: sortOrder})
    .skip(page*pageSize)
    .limit(pageSize)
    .catch(e => {throw e})
  console.log(products)
  res.send(products)
})



export {productRouter}

