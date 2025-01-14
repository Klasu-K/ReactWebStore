import { ReactNode } from "react";
import styled from "styled-components";
import DisplayChildren from "./showChildren/DisplayChildren";
import ToggleVisibility from "./showChildren/buttonStyles/ToggleVisibilityButton_close";

interface Props {
  className?: string;
  children?: ReactNode;
}

const ShowChild = ({className, children}: Props) => {
  return (
    <DisplayChildren>
      <aside className={className}>
          <div className="sticky-div">
            <ToggleVisibility/>
            {children}
          </div>
      </aside>
    </DisplayChildren>
  )
}

const StyledShowChild = styled(ShowChild)`
  flex: 0 0 250px;
  height: auto;
  margin-left: auto;
  padding-right: var(--site-left-space);
  
  .sticky-div {
    position: sticky;
    max-height: calc(100vh - var(--navbar-height));
    padding-top: var(--space-after-navbar);
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
export default StyledShowChild