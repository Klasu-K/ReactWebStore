import styled from "styled-components"


const StyledProductContainer = styled.section`
  display: grid;
  --produc-min-width: 200px;
  grid-template-columns: repeat(auto-fill, minmax(var(--produc-min-width), 1fr));
  gap: 20px; /* Spacing between items */
  @media (max-width: 700px) {
    --produc-min-width: 150px;
  }
`

export default StyledProductContainer

