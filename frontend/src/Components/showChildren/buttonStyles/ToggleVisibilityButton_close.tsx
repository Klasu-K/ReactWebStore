import styled from "styled-components";
import ToggleVisibilityButton from "../ToggleVisibilityButton";
import closeIcon from "../../../assets/icons/close_x_icon.svg"

interface Props {
  className?: string
}

const Button = ({className} :Props) => {
  return (
    <ToggleVisibilityButton className={className}>
      <img className="close-icon" src={closeIcon}></img>
    </ToggleVisibilityButton>
  )
}

const ToggleVisibilityButton_Close = styled(Button)`
  border: none;
  display: flex;
  align-items: center;
  transition: all 1s;
  .close-icon {
    width: 20px;
    height: 20px;
  }
  :hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`

export default ToggleVisibilityButton_Close