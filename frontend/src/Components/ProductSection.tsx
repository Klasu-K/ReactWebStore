import styled from "styled-components"
import ProductFilterArea from './ProductFilterArea'
import ProductArea from './ProductArea'
import { useState, useEffect } from "react";
import AppliedFiltersArea from "./AppliedFiltersArea";
import productQueries from "../services/productQueries";

interface Props {
  className?: string;
}

const ProductSection = ({className} : Props) => {
  const [possibleFilters, setPossibleFiltersState] = useState<productFilters>()
  const [rangeFilters, setRangeFiltersState] = useState<rangeFilter[]>([])
  const [simpleFiltersMap, setSimpleFiltersMapState] = useState<simpleFiltersMap>(
    new Map<string, Map<string,boolean>>()
  )
  let productFilters : productFilters = {
    simpleFilters: getActiveSimpleFilters(simpleFiltersMap),
    rangeFilters: rangeFilters,
  }

  useEffect(() => {
    getFilteringOptions()
    .then(productFilters => {
      setPossibleFiltersState(productFilters)
      setSimpleFiltersMapState(new Map<string, Map<string,boolean>>(
        productFilters.simpleFilters.map(([category, filters]) => [
          category, 
          new Map(filters.map(filter => [filter, false]))
        ])
      ))
      console.log("possibleSimpleFilters:", possibleFilters?.simpleFilters)
    })
  }, [])

  const toggleSimpleFilter = (category: string, filter: string) => {
    let updatedSimpleFiltersMap = calculateToggledSimpleFilters(category, filter, simpleFiltersMap)
    setSimpleFiltersMapState(updatedSimpleFiltersMap)
  }

  const setRangeFilter = (filterName: string, min: number, max: number)  => {
    let updatedRangeFilters = [...rangeFilters]
    let filterToUpdateIndex = updatedRangeFilters.findIndex(filter => filter[0] === filterName)
    if(filterToUpdateIndex = -1) {
      updatedRangeFilters.push([filterName, min, max])
    }
    else {
      updatedRangeFilters[filterToUpdateIndex] = [filterName, min, max]
    }
    setRangeFiltersState(updatedRangeFilters)
  }

  return(
    <div className={className}>
      <ProductFilterArea className="left-side"
      toggleSimpleFilterState = {toggleSimpleFilter}
      setRangeFilterState = {setRangeFilter}
      possibleRangeFilters = {possibleFilters?.rangeFilters}
      simpleFiltersMap = {simpleFiltersMap}
      />
      <div className="right-side">
        <AppliedFiltersArea productFilters={productFilters} toggleSimpleFilterState={toggleSimpleFilter}/>
        <ProductArea productFilters={productFilters}/> 
      </div>
    </div>      
  )
}

const calculateToggledSimpleFilters = (category: string, filter: string,simpleFiltersMap: simpleFiltersMap) => {
  let updatedStates: simpleFiltersMap = new Map(simpleFiltersMap)
  const previsiousState = simpleFiltersMap.get(category)?.get(filter)
  if(previsiousState !== undefined) {
    updatedStates.get(category)?.set(filter, !previsiousState)
  }
  else {
    console.error(`filter with value: "${filter}" doens't exist`)
  }
  return updatedStates
}

const getFilteringOptions =  async () => {
  return productQueries.getFilters()
}

const rangeFiltersMapToRangeFilters = (rangeFiltersMap: rangeFiltersMap) => {
  const rangeFilters: rangeFilter[] = Array.from(rangeFiltersMap)
  .map(([name, [min,max]]) => [name, min, max])
  return rangeFilters
}

const getActiveSimpleFilters = (simpleFiltersMap: simpleFiltersMap) => {
  //makes array with category as first value and array from filters that are active as second value; Ex. [[brand, [brand1, brand2]], [color, [blue, red, green]]

  let activeFilters: simpleFilter[] = []
  simpleFiltersMap.forEach((filterMap, category) => {
    let activeArray: string[] = Array.from(filterMap).flatMap(([filter, active]) => active ? filter : [])
    if(activeArray.length != 0) {
      activeFilters.push([category, activeArray])
    }
  });
  return activeFilters
}


const StyledProductSection = styled(ProductSection)`
  --producSection-mainColor: #f1f1f1;
  display: flex;
  width: 100%;
  background: var(--producSection-mainColor);
  .right-side {
    margin-right: auto;
    padding-right: var(--site-min-right-space);
  }
`

export default StyledProductSection