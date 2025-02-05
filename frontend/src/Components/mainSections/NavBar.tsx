import styled from "styled-components";

interface Props {
  className?: string
}

const NavBar = ({className}: Props) => {
  return(
    <nav className={className}>
      <a className="github-link" href="https://github.com/Klasu-K/ReactWebStore">check github repository</a>
    </nav>
  )
}

const StyledNavBar = styled(NavBar)`
  background-color: var(--navbar-color);
  height: var(--navbar-height);
  position: sticky;
  right: 0;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  z-index: 100;

  .github-link {
    margin-left: 50px;
    color: #2f2f2f;
    &:visited {
      color: #2f2f2f;
    }
    &:hover {
      color: black;
    }
    
  }
`

export default StyledNavBar