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
  const {page, pageSize, sortBy, sortOrder, simpleFilters, rangeFilters} = body


  const queryFilter = makeProductFilter(simpleFilters, rangeFilters)

  console.log(queryFilter)
  let products = await Product.find(queryFilter)
    .sort({[sortBy]: sortOrder})
    .skip(page*pageSize)
    .limit(pageSize)
    .catch(e => {throw e})
  res.send(products)
})

const makeProductFilter = (simpleFilters : [string, string[]][], rangeFilters : [string, number, number][]) =>
{
  const simpleProductFilters = simpleFilters.reduce((acc, filter) => {
    acc[filter[0]] = { $in: filter[1] };
    return acc;
  }, {} as { [key: string]: {} });
  
  const rangeProductFilters = rangeFilters.reduce((acc, filter) => {
    acc[filter[0]] = { $gte: filter[1], $lte: filter[2]};
    return acc;
  }, {} as { [key: string]: {} });
  return {...simpleProductFilters, ...rangeProductFilters}
}



export {productRouter}

