import {Router} from "express"
import {Product} from "../models/productSchema"
import misc from "../development/misc"
import {makeProductFilter, queryForFilters} from "../utils/filterQueries"

const productRouter = Router()

productRouter.get("/test", async (req, res) => {
  console.log("test")
  //await misc.copyDataToDataBase() //TODO remove on production
  res.send("test")
})

let cachedProductFilters: productFilters
productRouter.get("/productFilters", async (req, res) => {
  const simpleFilters = ["category", "brand", "operating system","camera type"] //properties that can be used for filtering, db uses same names on it's product data
  const rangeFilters = ["price","storage capacity","battery capacity"]
  let productFilters
  //!WARNING makes product filters only update after server restart
  if(!cachedProductFilters || true/* BLOCKS CACHING TODO: REMOVE */) {
    try {
      cachedProductFilters = await queryForFilters(simpleFilters, rangeFilters)
    }
    catch (e) {
      console.error(e)
      res.sendStatus(500)
    }
  }
  else {
    console.log("used cached productFilters, restart server to reset cache")
  }
  productFilters = cachedProductFilters
  res.send(productFilters)
})

productRouter.get("/:id", (req, res) => {
  const id = req.params.id
  Product.findById(id)
  .then(item => res.send(item))
  .catch(_e => console.error(`could not get object by id ${id}`))
})

productRouter.post("", async (req, res) => {
  const body: IproductQuery = req.body
  const {page, pageSize, sortBy, sortOrder, simpleFilters, rangeFilters} = body

  const queryFilter = makeProductFilter(simpleFilters, rangeFilters)

  let products = await Product.find(queryFilter)
    .sort({[sortBy]: sortOrder})
    .skip(page*pageSize)
    .limit(pageSize)
    .select("-__v")
    .catch(e => {throw e})
  res.send(products)
})


export {productRouter}

