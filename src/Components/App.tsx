import { createGlobalStyle } from 'styled-components'

import NavBar from "./NavBar"
import ProductFilter from "./ProductFilter"
import Footer from "./Footer"
import ProductSection from './ProductSection'
import ProductArea from './ProductArea'

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
    <>
      <GlobalStyle/>
      <NavBar/>
      <main>
        <ProductSection>
          <ProductFilter/>
          <ProductArea/>       
        </ProductSection>
        
      </main>
      <Footer></Footer>
      </>
    
  )
}

export default App
