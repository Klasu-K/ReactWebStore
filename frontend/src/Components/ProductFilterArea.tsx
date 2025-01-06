import styled from "styled-components";
import ProductFilterDropdown from "./ProductFilterDropdown";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import ProductFilterSlider from "./ProductFilterSlider";
import { useEffect, useMemo, useRef, useState } from "react";
import productQueries from "../services/productQueries";



interface Props {
  className?: string;
  toggleSimpleFilterState: (category: string, filter: string) => void;
  setRangeFilterState: (filterName: string, min: number, max: number) => void;
  possibleRangeFilters: rangeFilter[] | undefined; //TODO this should not need undefined
  simpleFiltersMap: simpleFiltersMap;
  


}

const ProductFilterArea = ({className, toggleSimpleFilterState, setRangeFilterState, possibleRangeFilters, simpleFiltersMap} : Props) => {
  return(
    <aside className={className}>
      <div className="sticky-div">
        {
          Array.from(simpleFiltersMap).map(([category, filters]) => (
            <ProductFilterDropdown label={category} key={category}>
              <FilterCheckboxGroup category={category} filters={filters} toggleFilterState={(toggleSimpleFilterState)}/>
            </ProductFilterDropdown>
          ))
        }
        {
          //renders sliders basen on possible rangefilters, but keeps track of selection in RangeFiltersMap
          possibleRangeFilters?.map(([name, min, max]) =>(
            <ProductFilterDropdown label={name} startOpen key={name}>
              <ProductFilterSlider
                newValueSelected={(minHandle, maxHandle) => {setRangeFilterState(name, minHandle, maxHandle)}}
                min={min}
                max={max}
              />
            </ProductFilterDropdown>
          ))
        }
      </div>
    </aside>
  )
}

const StyledProductFilterArea = styled(ProductFilterArea)`
  flex: 0 0 250px;
  height: auto;
  display: block; 
  margin-left: auto;
  padding: 0 max(var(--site-left-space), 2vw) 0 var(--site-left-space);
  .sticky-div {
    position: sticky;
    max-height: calc(100vh - var(--navbar-height));
    padding-top: var(--space-after-navbar);
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