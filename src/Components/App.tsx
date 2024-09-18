import Product from "./Product"
import ProductContainer from "./ProductContainer"
import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle<{}>`
    html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  ol, ul {
      list-style: none;
  }
`
const App = () => {


  return (
    <ProductContainer>
      <GlobalStyle/>
      <MockProduct></MockProduct>
      <MockProduct></MockProduct>
      <MockProduct></MockProduct>
      <MockProduct></MockProduct>
      <MockProduct></MockProduct>
      <MockProduct></MockProduct>
      <MockProduct></MockProduct>
      <MockProduct></MockProduct>
      <MockProduct></MockProduct>
      <MockProduct></MockProduct>
      <MockProduct></MockProduct>
    </ProductContainer>
  )
}


const MockProduct = () => 
<Product title="motor boat" imageURL="https://5.imimg.com/data5/TV/DX/OW/SELLER-8265095/plastic-motor-boat-500x500.jpg" desc="this is cheap" price={200}></Product>
  

export default App
