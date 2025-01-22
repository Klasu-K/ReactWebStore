import styled from "styled-components";

interface Props {
  className?: string;
  simpleFilter: simpleFilter;
  toggleSimpleFilterState: (key: SimpleFilterKey) => void;
}

const AppliedSimpleFilter = ({ className, simpleFilter, toggleSimpleFilterState }: Props) => {

  const removeFilterGroup = () => {
    simpleFilter[1].forEach(filter => removeSingleFilter(filter))
  }

  const removeSingleFilter = (filter: string) => {
    toggleSimpleFilterState({category: simpleFilter[0], filter})
  }

  return (
    <div className={className}>
      <div className="title-area">
        <span className="title" onClick={removeFilterGroup}>{simpleFilter[0]}</span>
      </div>
      <div className="filters">
        {simpleFilter[1].map((filter) => {
          return (
            <div className="filter" key={filter} onClick={() => removeSingleFilter(filter)}>
              <span className="filter-inner-wrapper">{filter}</span>
            </div>
            )
        })}
      </div>
    </div>
  );
};

const StyledAppliedSimpleFilter = styled(AppliedSimpleFilter)`
  display: flex;
  .title-area {
    min-width: 150px;
  }
  .title {
    font-weight: 500;
    font-size: 1.1rem;
    display: block;
    transform: translateY(-2px);
    &:hover {
      text-decoration: line-through;
      text-decoration-color: #000000;
      text-decoration-thickness: 1px;
      color: gray;
    }
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
    position: relative;
    &::after {
      content: "\\2715";
      border: none;
      position: relative;
      right: 5px;
      font-size: 0.8rem;
      font-weight: 400;
      padding-left: 10px;
      color: #0000007d;
    }
    &:hover .filter-inner-wrapper {
      text-decoration: line-through;
      text-decoration-color: #000000;
      text-decoration-thickness: 1px;
      color: gray;
    }
  }
`;

export default StyledAppliedSimpleFilter;