import { createGlobalStyle } from 'styled-components'

import NavBar from './NavBar'
import Footer from './Footer'
import StyledProductSection from './ProductSection'


const GlobalStyle = createGlobalStyle<{}>`
  :root {
    --navbar-height: 50px;
  }
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
        <StyledProductSection/>
      </main>
      <Footer></Footer>
      </>
    
  )
}

export default App
