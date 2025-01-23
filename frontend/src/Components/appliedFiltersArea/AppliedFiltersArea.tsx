import styled from "styled-components";
import AppliedSimpleFilter from "./AppliedSimpleFilter";
import StyledAppliedRangeFilter from "./AppliedRangeFilter";
import { useState } from "react";

interface Props {
  className?: string;
  productFilters: productFilters;
  toggleSimpleFilterState: (key: SimpleFilterKey) => void;
  resetRangeFilter : (filterName: string) => void;
}

const AppliedFiltersArea = ({ className, productFilters, toggleSimpleFilterState, resetRangeFilter }: Props) => {
  const [expanded, setExpanded] = useState(false)

  let simpleFilters = productFilters.simpleFilters
  let rangeFilters = productFilters.rangeFilters
  if(simpleFilters.length || rangeFilters.length) {
    return (
      <div className={`${className} ${expanded ? "expand" : ""}`} onClick={() => setExpanded(val => !val)}>
        <div className="filter-wrapper">
          <div className="applied-filters">
            {simpleFilters.map((simpleFilter) => {
              return <AppliedSimpleFilter simpleFilter={simpleFilter} key={simpleFilter[0]} toggleSimpleFilterState={toggleSimpleFilterState}/>
            })}
            {rangeFilters.map((rangeFilter) => {
              return <StyledAppliedRangeFilter resetRangeFilter={() => resetRangeFilter(rangeFilter[0])} rangeFilter={rangeFilter} key={rangeFilter[0]}/>
            })}
          </div>
        </div>
        <div className="text-overlay">
          <div className="horizontal-lines"></div>
        </div>
      </div>
    );
  }
  else {
    return null
  }
};

const StyledAppliedFiltersArea = styled(AppliedFiltersArea)`
  --appliedfilters-main-color: #e0e0e0;
  border-radius:  2px 2px 3px 3px;
  top: calc(var(--navbar-height) - 1px); //-1px fixes visual mobile clitch
  margin-bottom: 10px;
  box-shadow: 0px 8px 8px -4px rgba(0, 0, 0, 0.274);
  transform: scaleX(1.02);
  position: sticky;
  z-index: 20;
  background-color: var(--appliedfilters-main-color);
  overflow: hidden;

  .applied-filters {
    padding: 10px;
    display:flex;
    flex-direction: column;
    max-height: 0px;
    gap: 3px;
  }
  .text-overlay {
    height: 35px;
    padding-bottom: 10px;
    z-index: 20;
    position: relative;
    background-color: var(--producSection-mainColor);
    background: linear-gradient(0deg, var(--appliedfilters-main-color) 80%, rgba(248,248,248,0) 100%);
    display: flex;
    align-items: end;
    justify-content: center;
  }
  .horizontal-lines {
    border-top: 2px solid gray;
    border-bottom: 2px solid gray;
    width: 120px;
    height: 5px;
  }
  @media (max-width: 700px) {
    &.expand {
    .applied-filters {
      max-height: 1000px;
    }
  }
  }
  @media (min-width: 700px) { 
    &:hover { 
      .applied-filters {
        max-height: 1000px;
      }
      .text-overlay {
        display: none;
      }
    }
  }
  
`

export default StyledAppliedFiltersArea;