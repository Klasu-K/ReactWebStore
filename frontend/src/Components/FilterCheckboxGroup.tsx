import styled from "styled-components";
import FilterCheckbox from "./FilterCheckbox";

interface Props {
  className?: string;
  category: string;
  filters: Map<string, boolean>;
  toggleFilterState: (category: string, filter : string) => void;
}

/**
 * @param checkboxTargets creates checkbox for all values
 * @param filters Map<string, boolean> handles checkbox state, needs to contain all values of checkboxTargets
 * @param toggleFilterState triggered on onChange
 */
const FilterCheckboxGroup = ({ className, category, toggleFilterState, filters }: Props) => {
  const filterCategory = category
  const filterArray = Array.from(filters).map(([filter]) => filter)
  
  return (
    <div className={className}>
      {
        filterArray.map(filter => <FilterCheckbox label={filter} checked={filters.get(filter) as boolean} onChange={() => toggleFilterState(filterCategory, filter)} key={filter}/>)
      }      
    </div>
  );
};

const StyledFilterCheckboxGroup = styled(FilterCheckboxGroup)`
  margin-left: 5px;
`;

export default StyledFilterCheckboxGroup;