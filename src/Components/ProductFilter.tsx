import styled from "styled-components";

interface FilterProps {
  className?: string;
}

const ProductFilter = ({className} : FilterProps) => {
  return(
    <aside className={className}>
    </aside>
  )
}

const StyledProductFilter = styled(ProductFilter)`
  background-color: #f1f9ff;
  flex: 0 0 300px;
  height: auto;
  display: block;
  
`

export default StyledProductFilter