import styled from "styled-components";

interface Props {
  className?: string;
}

const Footer = ({className} : Props) => {
  return(
    <footer className={className}></footer>
  )
}

const StyledFooter = styled(Footer)`
  background-color: var(--footer-color);
  height: 300px;
  width: 100%;
`
export default StyledFooter