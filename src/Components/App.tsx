import { createGlobalStyle } from 'styled-components'
import productImages from "../assets/data/productImageURLs.json"

import Product from "./Product"
import ProductContainer from "./ProductContainer"
import StyledNavBar from "./NavBar"


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


const MockProduct = () => {
  let min = 0
  let max = 10
  let randomInt = Math.floor(Math.random() * (max - min + 1)) + min
  let imgURL = productImages.urls[randomInt]
  return(
    <Product 
    title="motor boat" 
    imageURL={imgURL} 
    desc={"this is cheap".repeat(randomInt)} 
    price={200}>
    </Product>
  )
}

  

export default App
