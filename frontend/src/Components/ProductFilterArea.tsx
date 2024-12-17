import styled from "styled-components";
import ProductFilterDropdown from "./ProductFilterDropdown";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import ProductFilterSlider from "./ProductFilterSlider";
import { useEffect, useMemo, useRef, useState } from "react";
import productQueries from "../services/productQueries";


type activeFiltersMap = Map<string, string[]>
type rangeFiltersMap = Map<string, [number, number]>
type simpleFiltersMap = Map<string, Map<string,boolean>>

interface Props {
  className?: string;
  filtersChanged: (filters: productFilters) => void
}

const ProductFilterArea = ({className, filtersChanged} : Props) => {
  //TODO FIX rangeFilters that are applied initially don't filter anything before first user intercation for that filter
  const initialSimpleFilters : simpleFilters = [
    ["brand", ["ProCell","EliteTech","MegaPixel"]],
    ["cameraFeatures", ["Quad-Camera", "Triple-Camera", "Dual-Camera", "Single-Camera"]]
  ]

  const initialRangeFilters : rangeFilters = [
    ["price", 0, 1000],
    ["storageCapacity", 0, 1000]
  ]

  //starts with all values false
  const [simpleFiltersMap, setSimpleFiltersMap] = useState<simpleFiltersMap>(
    new Map<string, Map<string,boolean>>(
      initialSimpleFilters.map(([category, filters]) => [
        category, 
        new Map(filters.map(filter => [filter, false]))
      ])
    )
  )

  const [rangeFiltersMap, setRangeFiltersMap] = useState<rangeFiltersMap>(new Map())

  useEffect(() => {
    getFilteringOptions()
    .then(/* TODO */)
  }, [])

  
  const GetActiveSimpleFiltersMap = (overrideSimpleFiltersMap?: simpleFiltersMap) => {

    const calculateActiveFilters = (simpleFiltersMap: simpleFiltersMap) => {
      //construct map with category as key and that category activeFilters as value
      let activeFilters: activeFiltersMap = new Map<string, string[]>
      simpleFiltersMap.forEach((filterMap, category) => {
        let activeArray: string[] = Array.from(filterMap).flatMap(([filter, active]) => active ? filter : [])
        if(activeArray.length != 0) {
          activeFilters.set(category, activeArray)
        }
      });
      return activeFilters
    }
    let activeFilters
    if(overrideSimpleFiltersMap === undefined) {
      //could use useMemo, but not inside function --update maybe later
      activeFilters = calculateActiveFilters(simpleFiltersMap)
    } else {
      activeFilters = calculateActiveFilters(overrideSimpleFiltersMap)
    }
    
    
    return activeFilters
  }

  //constructs string array from filter names that have value "true" attached to them
  const activeSimpleFiltersMap = GetActiveSimpleFiltersMap()

  const SendFiltersToParent = (activeSimpleFiltersMap: activeFiltersMap, rangeFiltersMap: rangeFiltersMap) => {
    let querySimpleFilters: simpleFilters = Array.from(activeSimpleFiltersMap);

    //flattens array innermost layer
    const queryRangeFilters: rangeFilters = Array.from(rangeFiltersMap)
    .map(([name, [min,max]]) => [name, min, max])

    let productFilters: productFilters = {
      simpleFilters: querySimpleFilters,
      rangeFilters: queryRangeFilters,
    }
      
    filtersChanged(productFilters)
  }

  const toggleFilterState = (category: string, filter: string) => {
    let updatedStates = new Map(simpleFiltersMap)
    const previsiousState = simpleFiltersMap.get(category)?.get(filter)
    if(previsiousState !== undefined) {
      updatedStates.get(category)?.set(filter, !previsiousState)
      setSimpleFiltersMap(updatedStates)
      SendFiltersToParent(GetActiveSimpleFiltersMap(updatedStates), rangeFiltersMap)
    }
    else {
      console.error(`filter with value: "${filter}" doens't exist`)
    }
  }

  const setRangeFilter = (filterName: string, min: number, max: number)  => {
    let updatedRanges = new Map(rangeFiltersMap)
    updatedRanges.set(filterName, [min, max])
    setRangeFiltersMap(updatedRanges)
    SendFiltersToParent(GetActiveSimpleFiltersMap(), updatedRanges)
  }

  return(
    <aside className={className}>
      <div>
        {
          Array.from(simpleFiltersMap).map(([category, filters]) => (
            <ProductFilterDropdown label={category} key={category}>
              <FilterCheckboxGroup category={category} filters={filters} toggleFilterState={(toggleFilterState)}/>
            </ProductFilterDropdown>
          ))
        }
        {
          initialRangeFilters.map(([name, min, max]) =>(
            <ProductFilterDropdown label={name} startOpen key={name}>
              <ProductFilterSlider
                newValueSelected={(minHandle, maxHandle) => {setRangeFilter(name, minHandle, maxHandle)}}
                min={min}
                max={max}
              />
            </ProductFilterDropdown>
          ))
        }

        {Array.from(activeSimpleFiltersMap).map(
          ([category, activeArray]) => activeArray.map((filter) => <p key={category+filter}>{`${category}: ${filter}`}</p>))
        }

        {Array.from(rangeFiltersMap).map(([name, [min, max]]) => {
          return <p key={name}>{name}: {min}-{max}</p>
        })}
      </div>
    </aside>
  )
}

const getFilteringOptions =  async () => {
  return productQueries.getFilters()
}

const StyledProductFilterArea = styled(ProductFilterArea)`
  background-color: #f1f9ff;
  flex: 0 0 300px;
  height: auto;
  display: block; 
  > div {
    position: sticky;
    top: var(--navbar-height);
  }
`

export default StyledProductFilterArea