import styled from "styled-components";

interface Props {
  className?: string
  rangeFilter: rangeFilter;
  resetRangeFilter : () => void;
}

const AppliedRangeFilter = ({className, rangeFilter, resetRangeFilter} : Props) => {
  const removeFilter = () => {
    resetRangeFilter()
  }
  return (
    <div className={className} onClick={removeFilter}>
      <div className="title-area">
        <span className="title">{rangeFilter[0]}</span>
      </div>
      <div className="filters">
        <div className="filter">{`${Math.round(rangeFilter[1])}`}</div>
        -
        <div className="filter">{`${Math.round(rangeFilter[2])}`}</div>
      </div>
    </div>
  )
}

const StyledAppliedRangeFilter = styled(AppliedRangeFilter)`
  display: flex;
  width: max-content;
  position: relative;
  .title-area {
    min-width: 150px;
  }
  .title {
    font-weight: 500;
    font-size: 1.1rem;  
    display: block;
    transform: translateY(-2px);
  }
  .filters {
    font-weight: 400;
    font-size: 1rem;
    padding-left: 10px;
    display: flex;
    flex-wrap: wrap;
    --gap-between-filters: 15px;
    column-gap: var(--gap-between-filters);
    
  }

  .filter {
   /*  color: #535353; */
    white-space: nowrap;
    word-spacing: -2px;
  }
  &:hover {
    color: gray;
    &::after{
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      --height: 1px;
      height: var(--height);
      top: calc(50% - var(--height) / 2); //
      background-color: black;
    }
  }
`

export default StyledAppliedRangeFilter