import styled from "styled-components";

interface Props {
  className?: string
}

const NavBar = ({className}: Props) => {
  return(
    <nav className={className}></nav>
  )
}

const StyledNavBar = styled(NavBar)`
  background-color: var(--navbar-color);
  height: var(--navbar-height);
  position: sticky;
  right: 0;
  left: 0;
  top: 0;
  z-index: 100;
`

export default StyledNavBar