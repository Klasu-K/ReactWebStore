import styled from "styled-components";
import ProductFilterDropdown from "./ProductFilterDropdown";


interface Props {
  className?: string;
}

const ProductFilterArea = ({className} : Props) => {
  return(
    <aside className={className}>
      <div>
        <ProductFilterDropdown label="Brand">
          <div>Brand 1</div>
          <div>Brand 2</div>
          <div>Brand 3</div>
          <div>Brand 4</div>
          <div>Brand 5</div>
          <div>Brand 6</div>
        </ProductFilterDropdown>
        <ProductFilterDropdown label="Color">
          <div>red</div>
          <div>blue</div>
          <div>green</div>
          <div>black</div>
          <div>white</div>
          <div>yellow</div>
        </ProductFilterDropdown>
      </div>
    </aside>
  )
}

const StyledProductFilterArea = styled(ProductFilterArea)`
  background-color: #f1f9ff;
  flex: 0 0 300px;
  height: auto;
  display: block; 
  > div {
    position: sticky;
    top: var(--navbar-height);
  }
`

export default StyledProductFilterArea