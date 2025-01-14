import styled from "styled-components";
import ToggleVisibilityButton from "../ToggleVisibilityButton";
import filterIcon from "../../../assets/icons/filter_icon.svg"

interface Props {
  className?: string
}

const Button = ({className}: Props) => {
  return (
    <ToggleVisibilityButton className={className}>
      <div>Filter</div>
      <img className="filter-icon" src={filterIcon}></img>
    </ToggleVisibilityButton>
  )
}

const ToggleVisibilityButton_Filter = styled(Button)`
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 20px;
  border: solid 1px #c6c6c6;
  padding: 5px 10px;
  margin: 10px;
  :hover {
    cursor: pointer;
  }
  .filter-icon {
    width: 20px;
    height: 20px;
  }
  
`
export default ToggleVisibilityButton_Filter
