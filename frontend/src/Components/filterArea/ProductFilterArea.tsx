import styled from "styled-components";
import ProductFilterDropdown from "./ProductFilterDropdown";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import ProductFilterSlider from "./ProductFilterSlider";



interface Props {
  className?: string;
  toggleSimpleFilterState: (key: SimpleFilterKey) => void;
  setRangeFilterState: (rangeFilter: rangeFilter) => void;
  rangeFilters: rangeFilter[];
  rangeFiltersValueRange: rangeFilter[];
  simpleFiltersMap: simpleFiltersMap;
}

const ProductFilterArea = ({className, toggleSimpleFilterState, setRangeFilterState, rangeFilters, simpleFiltersMap, rangeFiltersValueRange} : Props) => {
  return(
    <div className={className}>
      {
        Array.from(simpleFiltersMap).map(([category, filters]) => (
          <ProductFilterDropdown label={category} key={category}>
            <FilterCheckboxGroup 
              category={category} 
              filters={filters} 
              toggleFilterState={toggleSimpleFilterState}
            />
          </ProductFilterDropdown>
        ))
      }
      {
        //renders sliders basen on rangeFiltersValueRange, but keeps track of selection in RangeFiltersMap
        rangeFiltersValueRange.map(([name, lowerBound, upperBound]) => (
          <ProductFilterDropdown label={name} key={name}>
            <ProductFilterSlider
              newValueSelected={(minHandle, maxHandle) => {setRangeFilterState([name, minHandle, maxHandle])}}
              rangeFilters={rangeFilters}
              filterName={name}
              rangeLowerBound={lowerBound}
              rangeUpperBound={upperBound}
            />
          </ProductFilterDropdown>
        ))
      }
    </div>
  )
}

const StyledProductFilterArea = styled(ProductFilterArea)`
  
`

export default StyledProductFilterArea