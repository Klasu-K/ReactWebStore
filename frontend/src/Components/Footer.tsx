import styled from "styled-components";

interface FooterProps {
  className?: string;
}

const Footer = ({className} : FooterProps) => {
  return(
    <footer className={className}></footer>
  )
}

const StyledFooter = styled(Footer)`
  background-color: #2c2e30;
  height: 300px;
  width: 100%;
`
export default StyledFooter