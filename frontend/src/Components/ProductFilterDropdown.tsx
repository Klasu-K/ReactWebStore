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
        <h3>{label}</h3>
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
border-top: 1px #0000005c solid;
margin: 0px 10px;
padding-bottom: 10px;
padding-top: 5px;
.labelArea {
  min-height: 1.5em;
  display: flex;

  &::after {
    content: "▲";
    font-size: 1.2em;
    margin-left: auto;
    transition: transform .3s;
  }
}

.content {
  max-height: 0px;
  overflow: hidden;
}

h3 {
  font-size: 1.5em; 
  font-weight: 500;
}

&.expanded {
  .content {
    max-height: 1000px;
    transition: all .7s;
  }
  .labelArea::after {
    transform: rotateX(180deg);
  }
}

`;

export default StyledProductFilterDropdown;