import styled from "styled-components";
import FilterCheckbox from "./FilterCheckbox";

interface Props {
  className?: string;
  checkboxTargets: string[];
  filters: Map<string, boolean>;
  toggleFilterState: (filter : string) => void;
}

/**
 * @param checkboxTargets creates checkbox for all values
 * @param filters Map<string, boolean> handles checkbox state, needs to contain all values of checkboxTargets
 * @param toggleFilterState triggered on onChange
 */
const FilterCheckboxGroup = ({ className, checkboxTargets, toggleFilterState, filters }: Props) => {
  
  return (
    <div className={className}>
      {
        checkboxTargets.map(filter => <FilterCheckbox label={filter} checked={filters.get(filter) as boolean} onChange={() => toggleFilterState(filter)} key={filter}/>)
      }      
    </div>
  );
};

const StyledFilterCheckboxGroup = styled(FilterCheckboxGroup)`
`;

export default StyledFilterCheckboxGroup;