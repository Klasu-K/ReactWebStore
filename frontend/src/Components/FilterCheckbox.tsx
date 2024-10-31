import styled from "styled-components";

interface Props {
  className?: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const FilterCheckbox = ({ className, label, checked, onChange}: Props) => {
  return (
    <label className={className}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

const StyledFilterCheckbox = styled(FilterCheckbox)`
  display: block;
  font-size: 1.3em;
  &:hover {
    backdrop-filter: brightness(95%);
  }
  
  input {
    margin-right: 10px;
    border: 10px red solid;
  }
`;

export default StyledFilterCheckbox;