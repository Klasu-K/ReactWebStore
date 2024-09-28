import {Router} from "express"
import productsData from "../development/products.json"
const productRouter = Router()

productRouter.get('/:id', (req, res) => {
  const id : number = Number(req.params.id)
  let text = productsData.products[id]  
  if(!text) {
    res.status(404).end()
  }
  res.send({...text, id: id})
})

export {productRouter}

