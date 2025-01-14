import styled from "styled-components"
import ProductFilterArea from './ProductFilterArea'
import ProductArea from './ProductArea'
import { useState, useEffect } from "react";
import AppliedFiltersArea from "./AppliedFiltersArea";
import productQueries from "../services/productQueries";
import { getRangeFilterIndexByName } from "../utils/rangeFilterUtils";
import ProductFilterAreaWrapper from "./ProductFilterAreaWrapper";
import ToggleVisibilityButton_Filter from "./showChildren/buttonStyles/ToggleVisibilityButton_filter";

interface Props {
  className?: string;
}

const ProductSection = ({className} : Props) => {
  const [possibleFilters, setPossibleFiltersState] = useState<productFilters>({simpleFilters: [], rangeFilters: []})
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
    //check if filter values are defaults
    let updatedRangeFilters = [...rangeFilters]    
    let filterToUpdateIndex = updatedRangeFilters.findIndex(filter => filter[0] === filterName)
    if(filterToUpdateIndex === -1) {
      updatedRangeFilters.push([filterName, min, max])
    }
    else {
      const defaultRangeIndex = getRangeFilterIndexByName(filterName, possibleFilters.rangeFilters)
      const defaultRange = possibleFilters.rangeFilters[defaultRangeIndex]
      if(min === defaultRange[1] && max === defaultRange[2]) {
        updatedRangeFilters.splice(filterToUpdateIndex, 1)
      }
      else {
        updatedRangeFilters[filterToUpdateIndex] = [filterName, min, max]
      }
    }
    setRangeFiltersState(updatedRangeFilters)
  }

  const resetRangeFilter = (filterName: string) => {
    let filterToUpdate = possibleFilters.rangeFilters.find(filter => filter[0] === filterName)
    if(!filterToUpdate) {
      console.error(`could not reset filter ${filterName}`)
    }
    else {
      setRangeFilter(filterToUpdate[0], filterToUpdate[1], filterToUpdate[2])
    }
  }

  return(
    <div className={className}>
      <ProductFilterAreaWrapper>
        <ProductFilterArea
          toggleSimpleFilterState = {toggleSimpleFilter}
          setRangeFilterState = {setRangeFilter}
          rangeFilters = {rangeFilters}
          rangeFiltersValueRange = {possibleFilters.rangeFilters}
          simpleFiltersMap = {simpleFiltersMap}>
        </ProductFilterArea>
      </ProductFilterAreaWrapper>
      
      <div className="right-side">
        <AppliedFiltersArea resetRangeFilter={resetRangeFilter} productFilters={productFilters} toggleSimpleFilterState={toggleSimpleFilter}/>
        <ToggleVisibilityButton_Filter/>
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
  width: 100%;
  background: var(--producSection-mainColor);
  display: flex;
  .right-side {
    flex-grow: 1;
    margin-right: auto;
    padding: 0 var(--site-min-right-space);
    max-width: 1500px;
  }

  @media (max-width: 800px) {
    .right-side {
      padding-right: 0;
    }
  }
`

export default StyledProductSection