import styled from "styled-components";
import ProductFilterDropdown from "./ProductFilterDropdown";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import ProductFilterSlider from "./ProductFilterSlider";
import { useMemo, useState } from "react";


interface Props {
  className?: string;
}

const ProductFilterArea = ({className} : Props) => {
  const brands = ["brand 1","brand 2","brand 3"]
  const colors = ["red", "green", "blue", "yellow"]
  const allFilters = brands.concat(colors)

  const [filters, setFilters] = useState<Map<string,boolean>>(new Map(
    allFilters.map(filter => [filter, false])
  ))
  
  const activeFilters = useMemo(() => Array.from(filters).flatMap(([filter, active]) => active ? filter : []), [filters])

  const toggleFilterState = (filter: string) => {
    let updatedStates = new Map(filters)
    const previsiousState = filters.get(filter)
    if(previsiousState !== undefined) {
      updatedStates.set(filter, !previsiousState)
      setFilters(updatedStates)
    }
    else {
      console.error(`filter with value: "${filter}" doens't exist`)
    }
  }

  return(
    <aside className={className}>
      <div>
        <ProductFilterDropdown label="Brand">
          <FilterCheckboxGroup checkboxTargets={brands} filters={filters} toggleFilterState={(toggleFilterState)}/>
        </ProductFilterDropdown>
        <ProductFilterDropdown label="Color">
          <FilterCheckboxGroup checkboxTargets={colors} filters={filters} toggleFilterState={(toggleFilterState)}/>
        </ProductFilterDropdown>
        <ProductFilterDropdown label="Price" startOpen>
          <ProductFilterSlider
            newValueSelected={() => {}}
            min={0}
            max={100}
          />
        </ProductFilterDropdown>
        {activeFilters.map(filter => <p key={filter}>{filter}</p>)}
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