import styled from "styled-components"
import ProductFilterArea from './ProductFilterArea'
import ProductArea from './ProductArea'
import { useState } from "react";
import AppliedFiltersArea from "./AppliedFiltersArea";

interface Props {
  className?: string;
}

const ProductSection = ({className} : Props) => {
  const [productFilters, setProductFilters] = useState<productFilters>({
    simpleFilters: [],
    rangeFilters: [],
  })

  const filtersChanged = (productFilters : productFilters) => {
    setProductFilters(productFilters)
  }

  return(
    <div className={className}>
      <ProductFilterArea className="left-side" filtersChanged={filtersChanged}/>
      <div className="right-side">
        <AppliedFiltersArea productFilters={productFilters}/>
        <ProductArea productFilters={productFilters}/> 
      </div>
    </div>      
  )
}

const StyledProductSection = styled(ProductSection)`
  --producSection-mainColor: #f1f1f1;
  display: flex;
  width: 100%;
  background: var(--producSection-mainColor);
  .right-side {
    margin-right: auto;
    padding-right: var(--site-min-right-space);
  }
`

export default StyledProductSection