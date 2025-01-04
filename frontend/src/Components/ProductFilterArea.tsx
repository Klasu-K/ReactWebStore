import styled from "styled-components";
import ProductFilterDropdown from "./ProductFilterDropdown";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import ProductFilterSlider from "./ProductFilterSlider";
import { useEffect, useMemo, useRef, useState } from "react";
import productQueries from "../services/productQueries";

type rangeFiltersMap = Map<string, [number, number]>
type simpleFiltersMap = Map<string, Map<string,boolean>>

interface Props {
  className?: string;
  filtersChanged: (filters: productFilters) => void
}

const ProductFilterArea = ({className, filtersChanged} : Props) => {

  const [possibleFilters, setPossibleFilters] = useState<productFilters>()
  const [rangeFiltersMap, setRangeFiltersMap] = useState<rangeFiltersMap>(new Map())
  const [simpleFiltersMap, setSimpleFiltersMap] = useState<simpleFiltersMap>(
    new Map<string, Map<string,boolean>>()
  )

  useEffect(() => {
    getFilteringOptions()
    .then(productFilters => {
      setPossibleFilters(productFilters)
      setSimpleFiltersMap(new Map<string, Map<string,boolean>>(
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

    let newFilters: productFilters = {
      simpleFilters: getActiveSimpleFilters(updatedSimpleFiltersMap),
      rangeFilters: rangeFiltersMapToRangeFilters(rangeFiltersMap),
    }
    setSimpleFiltersMap(updatedSimpleFiltersMap)
    filtersChanged(newFilters)
  }

  const setRangeFilter = (filterName: string, min: number, max: number)  => {
    let updatedRangeFiltersMap = new Map(rangeFiltersMap)
    updatedRangeFiltersMap.set(filterName, [min, max])

    let newFilters: productFilters = {
      simpleFilters: getActiveSimpleFilters(simpleFiltersMap),
      rangeFilters: rangeFiltersMapToRangeFilters(updatedRangeFiltersMap),
    }
    setRangeFiltersMap(updatedRangeFiltersMap)
    filtersChanged(newFilters)
  }

  return(
    <aside className={className}>
      <div>
        {
          Array.from(simpleFiltersMap).map(([category, filters]) => (
            <ProductFilterDropdown label={category} key={category}>
              <FilterCheckboxGroup category={category} filters={filters} toggleFilterState={(toggleSimpleFilter)}/>
            </ProductFilterDropdown>
          ))
        }
        {
          //renders sliders basen on possible rangefilters, but keeps track of selection in RangeFiltersMap
          possibleFilters?.rangeFilters.map(([name, min, max]) =>(
            <ProductFilterDropdown label={name} startOpen key={name}>
              <ProductFilterSlider
                newValueSelected={(minHandle, maxHandle) => {setRangeFilter(name, minHandle, maxHandle)}}
                min={min}
                max={max}
              />
            </ProductFilterDropdown>
          ))
        }

        {getActiveSimpleFilters(simpleFiltersMap).map(
          ([category, activeArray]) => activeArray.map((filter) => <p key={category+filter}>{`${category}: ${filter}`}</p>))
        }

        {Array.from(rangeFiltersMap).map(([name, [min, max]]) => {
          return <p key={name}>{name}: {min}-{max}</p>
        })}
      </div>
    </aside>
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
  const rangeFilters: rangeFilters = Array.from(rangeFiltersMap)
  .map(([name, [min,max]]) => [name, min, max])
  return rangeFilters
}

const getActiveSimpleFilters = (simpleFiltersMap: simpleFiltersMap) => {
  //makes array with category as first value and array from filters that are active as second value; Ex. [[brand, [brand1, brand2]], [color, [blue, red, green]]

  let activeFilters: simpleFilters = []
  simpleFiltersMap.forEach((filterMap, category) => {
    let activeArray: string[] = Array.from(filterMap).flatMap(([filter, active]) => active ? filter : [])
    if(activeArray.length != 0) {
      activeFilters.push([category, activeArray])
    }
  });
  return activeFilters
}

const StyledProductFilterArea = styled(ProductFilterArea)`
  background-color: #f1f9ff;
  flex: 0 0 250px;
  height: auto;
  display: block; 
  > div {
    position: sticky;
    max-height: calc(100vh - var(--navbar-height));
    padding-left: var(--site-left-space);
    top: var(--navbar-height);
    overflow-y: auto;

    //Hide scrollbar for Chrome, Safari and Opera
    ::-webkit-scrollbar {
      display: none;
    }
    //Hide scrollbar for IE, Edge, Firefox
    -ms-overflow-style: none;  //IE and Edge
    scrollbar-width: none;  //Firefox

  }
`

export default StyledProductFilterArea