import {Router} from "express"
import {Product, Iproducts} from "../models/productSchema"
import misc from "../development/misc"
import mongoose from "mongoose"


const productRouter = Router()

productRouter.get('/test', async (req, res) => {
  //used to test or exeute any functionality on runtime
  //await misc.copyDataToDataBase()
  res.send()
})


let cachedProductFilters: productFilters
productRouter.get("/productFilters", async (req, res) => {
  //properties that can be used for filtering, db uses same names on it's product data
  const simpleFilters = ["category", "brand", "operatingSystem","cameraFeatures"]
  const rangeFilters = ["price","storageCapacity","batteryCapacity"]
  //WARNING makes product filters only update after server restart
  let productFilters
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
  console.log("products:", products)
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

const queryForFilters = async (simpleFiltersProperties:string[], rangeFiltersProperties:string[]) => {
  let query:any = [
    {
      $group: {_id:null}
    },
    {
      $project: {
        _id:0,
        simpleFilters: {},
        rangeFilters: {},
      }
    }
  ]
  let groupStage = query[0].$group
  let projectStage = query[1].$project
  simpleFiltersProperties.forEach(filter => {
    let filters = `${filter}s`
    let $filters = `$${filter}s`
    let $filter = `$${filter}`
    //example: colors: {$addToSet: "$color"}
    groupStage[filters] = {$addToSet: $filter}
    //example: colors: 1
    projectStage.simpleFilters[filter] = $filters
  })
  rangeFiltersProperties.forEach(filter => {
    let filterMin = `${filter}Min`
    let filterMax = `${filter}Max`
    let $filterMin = `$${filter}Min`
    let $filterMax = `$${filter}Max`
    let $filter = `$${filter}`
    //example: priceMin: {$min: "$price"}
    groupStage[filterMin] = {$min: $filter}
    groupStage[filterMax] = {$max: $filter}
    //example: price: ["$priceMin", "$priceMax"]
    projectStage.rangeFilters[filter] = [$filterMin,$filterMax]
  })
  //console.dir(query, {depth: null}) //query
  let productFiltersObject = await Product.aggregate(query)
  let simpleFilters = Object.entries(productFiltersObject[0].simpleFilters) as simpleFilters
  let nestedRangeFilters: [string,[number,number]][] = Object.entries(productFiltersObject[0].rangeFilters)
  let rangeFilters: rangeFilters = nestedRangeFilters
  .map(([value, [min, max]]) => [value, min, max])
  //let productFilters = productFiltersObject
  let productFilters: productFilters = {
    simpleFilters,
    rangeFilters,
  }
    
  console.dir(productFilters, {depth: null})
  return productFilters
}


export {productRouter}

