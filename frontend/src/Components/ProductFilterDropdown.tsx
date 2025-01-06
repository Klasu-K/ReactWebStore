import { ReactNode, useState } from "react";
import styled from "styled-components";

interface Props {
  className?: string;
  children?: ReactNode;
  startOpen?: boolean;
  label: string;
}

const ProductFilterDropdown = ({ className, label, children, startOpen }: Props) => {
   const [expanded, setExpanded] = useState(!!startOpen)

  return (
    <div className={`${className} ${expanded ? "expanded" : ""}`}>
      <div className={`labelArea`} onClick={() => setExpanded(!expanded)}>
        <h3 className="label">{label}</h3>
      </div>
      <div className={`content`}>
        {children}
      </div>
    </div>
  );
};

const StyledProductFilterDropdown = styled(ProductFilterDropdown)`

&:first-of-type {
  border-top: none
}
min-width: 230px;
border-top: 1px #0000005c solid;
margin: 0px 10px;
padding-bottom: 10px;
padding-top: 5px;
.labelArea {
  min-height: 1.5em;
  display: flex;
  text-shadow: 1px 1px 1px #c2c2c2dc;

  &::after {
    content: "▲";
    font-size: 1em;
    margin-left: auto;
    transition: transform .3s;
  }
}

.content {
  max-height: 0px;
  overflow: hidden;
  padding: 0px 0px;
  
}

.label {
  text-transform: capitalize;
  font-size: 1.3em; 
  font-weight: 500;
}

&.expanded {
  .content {
    padding: 10px 0;
    max-height: 1000px; //max-height doesn't correlate with content height
    transition: padding linear 0.01s, max-height 0.7s linear;
  }
  .labelArea::after {
    transform: rotateX(180deg);
  }
}

`;

export default StyledProductFilterDropdown;