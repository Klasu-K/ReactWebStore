import styled from "styled-components"
import ProductFilterArea from "./ProductFilterArea"
import ProductArea from "./ProductArea"
import { useState, useEffect } from "react";
import AppliedFiltersArea from "./AppliedFiltersArea";
import productQueries from "../services/productQueries";
import { getRangeFilterIndexByName } from "../utils/rangeFilterUtils";
import ProductFilterAreaWrapper from "./ProductFilterAreaWrapper";
import ToggleVisibilityButton_Filter from "./showChildren/buttonStyles/ToggleVisibilityButton_filter";

interface Props {
  className?: string;
}

type setRangeFiltersState = React.Dispatch<React.SetStateAction<rangeFilter[]>>
type setSimpleFiltersMapState = React.Dispatch<React.SetStateAction<simpleFiltersMap>>

const ProductSection = ({className} : Props) => {
  const [rangeFiltersDefaults, setRangeFiltersDefaults] = useState<rangeFilter[]>([])

  const [rangeFilters, setRangeFiltersState] = useState<rangeFilter[]>([])
  const [simpleFiltersStates, setSimpleFiltersStates] = useState<simpleFiltersMap>(
    new Map<string, Map<string,boolean>>()
  )

  useEffect(() => {
    initializeFilters(setRangeFiltersDefaults, setSimpleFiltersStates)
  }, [])

  let productFilters : productFilters = {
    simpleFilters: getActiveSimpleFilters(simpleFiltersStates),
    rangeFilters: rangeFilters,
  }

  const wrapSetRangeFilter = (rangeFilter: rangeFilter) => {setRangeFilter(rangeFilter, rangeFilters, rangeFiltersDefaults, setRangeFiltersState)}
  const wrapResetRangeFilter = (filterName: string) => {resetRangeFilter(filterName, rangeFilters, rangeFiltersDefaults, setRangeFiltersState)}

  return(
    <div className={className}>
      <ProductFilterAreaWrapper>
        <ProductFilterArea
          toggleSimpleFilterState = {(key) => toggleSimpleFilter(key,setSimpleFiltersStates)}
          setRangeFilterState = {wrapSetRangeFilter}
          rangeFilters = {rangeFilters}
          rangeFiltersValueRange = {rangeFiltersDefaults}
          simpleFiltersMap = {simpleFiltersStates}>
        </ProductFilterArea>
      </ProductFilterAreaWrapper>
      
      <div className="right-side">
        <AppliedFiltersArea resetRangeFilter={wrapResetRangeFilter} productFilters={productFilters} toggleSimpleFilterState={(key) => toggleSimpleFilter(key, setSimpleFiltersStates)}/>
        <ToggleVisibilityButton_Filter/>
        <ProductArea productFilters={productFilters}/> 
      </div>
    </div>      
  )
}

const resetRangeFilter = (filterName: string, rangeFilters: rangeFilter[], rangeFiltersDefaults: rangeFilter[], setRangeFiltersState: setRangeFiltersState) => {
  let filterToUpdate = rangeFiltersDefaults.find(filter => filter[0] === filterName)
  if(!filterToUpdate) {
    console.error(`could not reset filter ${filterName}`)
  }
  else {
    setRangeFilter(filterToUpdate, rangeFilters, rangeFiltersDefaults, setRangeFiltersState)
  }
}

const setRangeFilter = (newRangeFilter : rangeFilter, rangeFilters: rangeFilter[], rangeFiltersDefaults: rangeFilter[], setRangeFiltersState: setRangeFiltersState)  => {
  const filterName = newRangeFilter[0]
  const min = newRangeFilter[1]
  const max  = newRangeFilter[2]
  let updatedRangeFilters = [...rangeFilters]    
  let filterToUpdateIndex = updatedRangeFilters.findIndex(filter => filter[0] === filterName)
  if(filterToUpdateIndex === -1) {
    updatedRangeFilters.push([filterName, min, max])
  }
  else {
    const defaultRangeIndex = getRangeFilterIndexByName(filterName, rangeFiltersDefaults)
    const defaultRange = rangeFiltersDefaults[defaultRangeIndex]
    //check if filter values are defaults
    if(min === defaultRange[1] && max === defaultRange[2]) {
      updatedRangeFilters.splice(filterToUpdateIndex, 1)
    }
    else {
      updatedRangeFilters[filterToUpdateIndex] = [filterName, min, max]
    }
  }
  setRangeFiltersState(updatedRangeFilters)
}

const calculateToggledSimpleFilters = ({category, filter}: SimpleFilterKey,simpleFiltersMap: simpleFiltersMap) => {
  let updatedStates: simpleFiltersMap = new Map(simpleFiltersMap)
  const previsiousState = simpleFiltersMap.get(category)?.get(filter)
  if(previsiousState !== undefined) {
    updatedStates.get(category)?.set(filter, !previsiousState)
  }
  else {
    console.error(`filter with value: "${filter}" doens"t exist`)
  }
  return updatedStates
}

const getFilteringOptions =  async () => {
  return productQueries.getFilters()
}

const getActiveSimpleFilters = (simpleFiltersMap: simpleFiltersMap) => {
  let activeFilters: simpleFilter[] = []
  simpleFiltersMap.forEach((filterMap, category) => {
    let activeArray: string[] = Array.from(filterMap).flatMap(([filter, active]) => active ? filter : [])
    if(activeArray.length !== 0) {
      activeFilters.push([category, activeArray])
    }
  });
  return activeFilters
}

const initializeFilters = async (setRangeFiltersDefaults : setRangeFiltersState, setSimpleFiltersStates: setSimpleFiltersMapState) => {
  getFilteringOptions()
    .then(productFilters => {
      setRangeFiltersDefaults(productFilters.rangeFilters);
      setSimpleFiltersStates(new Map<string, Map<string, boolean>>(
        productFilters.simpleFilters.map(([category, filters]) => [
          category,
          new Map(filters.map(filter => [filter, false]))
        ])
      ));
    });
}

const toggleSimpleFilter = (key: SimpleFilterKey, setSimpleFiltersStates: setSimpleFiltersMapState) => {
  setSimpleFiltersStates(previsous => calculateToggledSimpleFilters(key, previsous))
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


