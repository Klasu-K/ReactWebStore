import styled from "styled-components";

interface Props {
  className?: string;
}

const ProductFilterArea = ({className} : Props) => {
  return(
    <aside className={className}>
    </aside>
  )
}

const StyledProductFilterArea = styled(ProductFilterArea)`
  background-color: #f1f9ff;
  flex: 0 0 300px;
  height: auto;
  display: block;
  
`

export default StyledProductFilterArea