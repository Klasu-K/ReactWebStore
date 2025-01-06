import styled from "styled-components";
import AppliedSimpleFilter from "./AppliedSimpleFilter";

interface Props {
  className?: string;
  productFilters: productFilters;
}

const AppliedFiltersArea = ({ className, productFilters }: Props) => {
  let simpleFilters = productFilters.simpleFilters
  let rangeFilters = productFilters.rangeFilters
  return (
    <div className={className}>
      <div className="filter-wrapper">
        {simpleFilters.map((simpleFilter) => {
          return <AppliedSimpleFilter simpleFilter={simpleFilter} key={simpleFilter[0]}/>
        })}
      </div> 
    </div>
  );
};

const StyledAppliedFiltersArea = styled(AppliedFiltersArea)`
  top: var(--navbar-height);
  margin-top: var(--space-after-navbar);
  padding: 10px;
  box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.1);
  position: sticky;
  display:flex;
  align-items: center;
  background-color: #f8f8f8;
  flex-direction: column;
`;

export default StyledAppliedFiltersArea;