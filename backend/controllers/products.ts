import {Router} from "express"
import productsData from "../development/products.json"
import { log } from "console"
const productRouter = Router()

productRouter.get('/:id', (req, res) => {
  const id : number = Number(req.params.id)
  let text = productsData.products[id]  
  if(!text) {
    res.status(404).end()
  }
  res.send({...text, id: id})
})

productRouter.post('', (req, res) => {
  let page : number = req.body.page
  console.log(page)
  res.send(page.toString())
})

export {productRouter}

