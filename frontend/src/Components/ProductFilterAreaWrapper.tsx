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
    <DisplayChildren>
      <aside className={className}>
          <div className="sticky-div">
            <div className="closetab-btn-wrapper">
              <ToggleVisibility/>
            </div>
            {children}
          </div>
      </aside>
    </DisplayChildren>
  )
}

const StyledProductFilterAreaWrapper = styled(ProductFilterAreaWrapper)`
  flex: 0 0 200px;
  overflow: hidden;
  height: auto;

  .closetab-btn-wrapper {
    display: block;
    width: max-content;
    margin: 0 7px 0 auto;
  }
  
  .sticky-div {
    position: sticky;
    max-height: calc(100vh - var(--navbar-height));
    top: var(--navbar-height);
    overflow-y: auto;
    

    //Hide scrollbar for Chrome, Safari and Opera
    ::-webkit-scrollbar {
      display: none;
    }
    //Hide scrollbar for IE, Edge, Firefox
    -ms-overflow-style: none;  //IE and Edge
    scrollbar-width: none;  //Firefox
  }
  @media (max-width: 800px) {
    z-index: 20;
    position: fixed;
    inset: 0;
    height: 100vh;
    background-color: var(--producSection-mainColor);
  }
`
export default StyledProductFilterAreaWrapper