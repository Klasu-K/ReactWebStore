import styled from "styled-components";

interface Props {
  className?: string;
  simpleFilter: simpleFilter;
}

const AppliedSimpleFilter = ({ className, simpleFilter }: Props) => {
  const removeSingleFilter = () => {
    console.log("remove single")
  }

  const removeFilterGroup = () => {
    console.log("remove group")
  }
  return (
    <div className={className}>
      <div className="title-area">
        <span className="title" onClick={removeFilterGroup}>{simpleFilter?.[0]}</span>
      </div>
      <div className="filters">
        {simpleFilter[1].map((filter) => {
          return (
            <div className="filter" key={filter} onClick={removeSingleFilter}>
              <span className="filter-inner-wrapper">{filter}</span>
            </div>
            )
        })}
      </div>
    </div>
  );
};

const StyledAppliedSimpleFilter = styled(AppliedSimpleFilter)`
  /* border: 1px solid #0000001a; */
  display: flex;
  .title-area {
    min-width: 180px;
  }
  .title {
    font-weight: 600;
    font-size: 22px;
    &:hover {
      text-decoration: line-through;
      text-decoration-color: #000000;
      text-decoration-thickness: 3px;
      color: gray;
    }
  }
  .filters {
    font-weight: 400;
    font-size: 20px;
    padding-left: 10px;
    display: flex;
    --gap-between-filters: 15px;
    gap: var(--gap-between-filters);
    
  }

  .filter {
    word-spacing: -2px;
    position: relative;
    &::after {
      //border element
      /* content: "";
      border-right: 1px solid gray;
      position: absolute;
      right: calc(var(--gap-between-filters) / -2);
      top: 7px;
      bottom: 7px; */
      content: "\\2715";
      border: none;
      position: relative;
      right: 5px;
      font-size: 15px;
      font-weight: 400;
      padding-left: 10px;
      color: #0000007d;
    }
    &:hover .filter-inner-wrapper {
      text-decoration: line-through;
      text-decoration-color: #000000;
      text-decoration-thickness: 3px;
      color: gray;
    }
  }
`;

export default StyledAppliedSimpleFilter;