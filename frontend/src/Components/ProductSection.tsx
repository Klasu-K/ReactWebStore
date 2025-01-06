import styled from "styled-components"
import ProductFilterArea from './ProductFilterArea'
import ProductArea from './ProductArea'
import { useState } from "react";

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
      <ProductFilterArea filtersChanged={filtersChanged}/>
      <ProductArea productFilters={productFilters}/> 
    </div>      
  )
}

const StyledProductSection = styled(ProductSection)`
  display: flex;
  width: 100%;
  background:#f1f1f1;
`

export default StyledProductSection