import styled from "styled-components"
import ProductFilterArea from './ProductFilterArea'
import ProductArea from './ProductArea'

interface Props {
  className?: string;
}

const ProductSection = ({className} : Props) => {

  const filtersChanged = (simpleFilters: simpleFilters, rangeFilters: rangeFilters) => {
    console.log("activeFilters: ", simpleFilters)

    console.log("rangefilters", rangeFilters)
  }

  return(
    <div className={className}>
      <ProductFilterArea filtersChanged={filtersChanged}/>
      <ProductArea/> 
    </div>      
  )
}

const StyledProductSection = styled(ProductSection)`
  display: flex;
  width: 100%;
`

export default StyledProductSection