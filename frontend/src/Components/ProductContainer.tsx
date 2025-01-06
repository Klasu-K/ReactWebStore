import styled from "styled-components"


const StyledProductContainer = styled.section`
  display: grid;
  margin: var(--space-after-navbar) 0 0 0;

  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px; /* Spacing between items */ 

  @media (max-width: 450px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
  }
`

export default StyledProductContainer

