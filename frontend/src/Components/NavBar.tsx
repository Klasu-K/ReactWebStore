import styled from "styled-components";

const NavBar = ({className}: {className? : string}) => {
  return(
    <nav className={className}></nav>
  )
}

const StyledNavBar = styled(NavBar)`
  background-color: #dadada;
  height: var(--navbar-height);
  width: 100%;
  position: sticky;
  left: 0px;
  top: 0px;
  z-index: 100;
`


export default StyledNavBar