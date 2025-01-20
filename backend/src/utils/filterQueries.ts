import {Product} from "../models/productSchema.js"

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
    let productFiltersObject = await Product.aggregate(query)
    let simpleFilters = Object.entries(productFiltersObject[0].simpleFilters) as simpleFilter[]
    let nestedRangeFilters: [string,[number,number]][] = Object.entries(productFiltersObject[0].rangeFilters)
    let rangeFilters: rangeFilter[] = nestedRangeFilters
    .map(([value, [min, max]]) => [value, min, max])
    let productFilters: productFilters = {
      simpleFilters,
      rangeFilters,
    }
    return productFilters
  }

export {makeProductFilter, queryForFilters}