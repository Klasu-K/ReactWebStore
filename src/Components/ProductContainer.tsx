import styled from "styled-components"


const ProductContainer = styled.section`
  display: grid;
  padding: 0 50px;
  flex: 1;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px; /* Spacing between items */ 

  @media (max-width: 450px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
  }
`

export default ProductContainer

