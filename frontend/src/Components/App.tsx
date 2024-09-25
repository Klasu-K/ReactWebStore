import { createGlobalStyle } from 'styled-components'

import NavBar from './NavBar'
import ProductFilterArea from './ProductFilterArea'
import Footer from './Footer'
import ProductSection from './ProductSection'
import ProductArea from './ProductArea'
import axios from 'axios'

//this is only for testing basic functinality
interface Idata {
  name: string;
  price: number;
  description: string;
}
const promise = axios.get<Idata>('http://localhost:3003/api/products/10')
.then(a => console.log(a.data.name))


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
          <ProductFilterArea/>
          <ProductArea/>       
        </ProductSection>
        
      </main>
      <Footer></Footer>
      </>
    
  )
}

export default App
