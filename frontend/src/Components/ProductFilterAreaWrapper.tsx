import { ReactNode } from "react";
import styled from "styled-components";
import DisplayChildren from "./showChildren/DisplayChildren";
import ToggleVisibility from "./showChildren/buttonStyles/ToggleVisibilityButton_close";

interface Props {
  className?: string;
  children?: ReactNode;
}

const ProductFilterAreaWrapper = ({className, children}: Props) => {
  return (
    <aside className={className}>
        <div className="sticky-div">
          <div className="closetab-btn-wrapper">
            <ToggleVisibility/>
          </div>
          {children}
        </div>
    </aside>
  )
} 

const StyledProductFilterAreaWrapper = styled(ProductFilterAreaWrapper)`
  height: 100%;

  .closetab-btn-wrapper {
    display: block;
    width: max-content;
    margin-left: auto;
  }
  
  .sticky-div {
    position: sticky;
    max-height: calc(100vh - var(--navbar-height));
    top: calc(var(--navbar-height) + var(--space-after-navbar));
    overflow-y: auto;
    padding-bottom : 40px;
    

    //Hide scrollbar for Chrome, Safari and Opera
    ::-webkit-scrollbar {
      display: none;
    }
    //Hide scrollbar for IE, Edge, Firefox
    -ms-overflow-style: none;  //IE and Edge
    scrollbar-width: none;  //Firefox
  }
  @media (max-width: 700px) {
    z-index: 10;
    position: fixed;
    max-width: 100%;
    inset: 0;
    height: 100vh;
    background-color: var(--producSection-mainColor);
  }
`
export default StyledProductFilterAreaWrapper