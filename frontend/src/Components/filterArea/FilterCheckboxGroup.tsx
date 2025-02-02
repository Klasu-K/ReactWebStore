import styled from "styled-components";
import FilterCheckbox from "./FilterCheckbox";

interface Props {
  className?: string;
  category: string;
  filters: Map<string, boolean>;
  toggleFilterState: (key: SimpleFilterKey) => void;
}

/**
 * @param filters Map<string, boolean> handles checkbox state, needs to contain all values of checkboxTargets
 * @param toggleFilterState triggered on onChange
 */
const FilterCheckboxGroup = ({ className, category, toggleFilterState, filters }: Props) => {
  const filterArray = Array.from(filters).map(([filter]) => filter)
  
  return (
    <div className={className}>
      {
        filterArray.map(filter => <FilterCheckbox 
          label={filter} 
          checked={filters.get(filter) as boolean} 
          onChange={() => toggleFilterState({category, filter})} 
          key={filter}/>
        )
      }      
    </div>
  );
};

const StyledFilterCheckboxGroup = styled(FilterCheckboxGroup)`
  margin-left: 5px;
`;

export default StyledFilterCheckboxGroup;