import styled from "styled-components";
import AppliedSimpleFilter from "./AppliedSimpleFilter";
import StyledAppliedRangeFilter from "./AppliedRangeFilter";

interface Props {
  className?: string;
  productFilters: productFilters;
  toggleSimpleFilterState: (category: string, filter: string) => void;
  resetRangeFilter : (filterName: string) => void;
}

const AppliedFiltersArea = ({ className, productFilters, toggleSimpleFilterState, resetRangeFilter }: Props) => {
  let simpleFilters = productFilters.simpleFilters
  let rangeFilters = productFilters.rangeFilters
  if(simpleFilters.length || rangeFilters.length) {
    return (
      <div className={className}>
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
          <div className="horizontal-lines">
            
          </div>
        </div>
      </div>
    );
  }
  else {
    return null
  }
};

const StyledAppliedFiltersArea = styled(AppliedFiltersArea)`
  top: var(--navbar-height);
  margin-top: var(--space-after-navbar);
  box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.1);
  position: sticky;
  background-color: var(--producSection-mainColor);
  overflow: hidden;
  &:hover {
    .applied-filters {
      max-height: 1000px;
    }
    .text-overlay {
      display:none;
    }
  }
  .applied-filters {
    padding: 10px;
    display:flex;
    flex-direction: column;
    max-height: 0px;
    gap: 10px;
  }
  .text-overlay {
    height: 35px;
    padding-bottom: 10px;
    z-index: 10;
    position: relative;
    background-color: var(--producSection-mainColor);
    background: linear-gradient(0deg, var(--producSection-mainColor) 50%, rgba(248,248,248,0) 100%);
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
  
`;

export default StyledAppliedFiltersArea;