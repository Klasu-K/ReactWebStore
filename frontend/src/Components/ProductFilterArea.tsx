import styled from "styled-components";
import ProductFilterDropdown from "./ProductFilterDropdown";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import ProductFilterSlider from "./ProductFilterSlider";
import { useEffect, useMemo, useRef, useState } from "react";
import productQueries from "../services/productQueries";


interface Props {
  className?: string;
}
let c = 1

const ProductFilterArea = ({className} : Props) => {
  const initialSimpleFilters : [string, string[]][] = [
    ["brand", ["ProCell","EliteTech","MegaPixel"]],
    ["cameraFeatures", ["Quad-Camera", "Triple-Camera", "Dual-Camera", "Single-Camera"]]
  ]

  const initialRangeFilters : [string, number, number][] = [
    ["price", 0, 1000],
    ["storageCapacity", 0, 1000]
  ]

  //starts with all values false
  const [filters, setFilters] = useState<Map<string, Map<string,boolean>>>(
    new Map<string, Map<string,boolean>>(
      initialSimpleFilters.map(([category, filters]) => [
        category, 
        new Map(filters.map(filter => [filter, false]))
      ])
    )
  )

  const [rangeFilters, setRangeFilters] = useState<Map<string, [number, number]>>(new Map())
  
  const calculateActiveFilters = () => {
    //construct map with category as key and that category activeFilters as value
    let activeFilters = new Map<string, string[]>
    filters.forEach((filterMap, category) => {
      let activeArray: string[] = Array.from(filterMap).flatMap(([filter, active]) => active ? filter : [])
      if(activeArray.length != 0) {
        activeFilters.set(category, activeArray)
      }
    });
    return activeFilters
  }

  //constructs string array from filter names that have value "true" attached to them
  const activeFilters = useMemo(calculateActiveFilters, [filters])
    

  console.log("activeFilters: ", activeFilters)

  const getProducts = () => {
    let querySimpleFilters: [string, string[]][] = Array.from(activeFilters);

    //flattens array innermost layer
    const queryRangeFilters: [string, number, number][] = Array.from(rangeFilters)
    .map(([name, [min,max]]) => [name, min, max])
    console.log("rangefilters", queryRangeFilters)
      
    productQueries.getMany(0, 100, querySimpleFilters, queryRangeFilters).then(data => console.log(data))
  }

  getProducts()

  const toggleFilterState = (category: string, filter: string) => {
    let updatedStates = new Map(filters)
    const previsiousState = filters.get(category)?.get(filter)
    if(previsiousState !== undefined) {
      updatedStates.get(category)?.set(filter, !previsiousState)
      setFilters(updatedStates)
    }
    else {
      console.error(`filter with value: "${filter}" doens't exist`)
    }
  }

  const setRangeFilter = (filterName: string, min: number, max: number)  => {
    let updatedRanges = new Map(rangeFilters)
    updatedRanges.set(filterName, [min, max])
    setRangeFilters(updatedRanges)
  }

  return(
    <aside className={className}>
      <div>
        {
          Array.from(filters).map(([category, filters]) => (
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

        {Array.from(activeFilters).map(
          ([category, activeArray]) => activeArray.map((filter) => <p key={category+filter}>{`${category}: ${filter}`}</p>))
        }

        {Array.from(rangeFilters).map(([name, [min, max]]) => {
          return <p key={name}>{name}: {min}-{max}</p>
        })}
      </div>
    </aside>
  )
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