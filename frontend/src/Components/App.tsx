import { createGlobalStyle } from 'styled-components'
import NavBar from './NavBar'
import Footer from './Footer'
import StyledProductSection from './ProductSection'
import funnelSansFont from "../assets/fonts/Funnel_Sans/FunnelSans-VariableFont_wght.ttf"



const GlobalStyle = createGlobalStyle<{}>`
  @font-face {
      font-family: "Funnel Sans";
      src: url(${funnelSansFont});
  }

  :root {
    --navbar-height: 50px;
    --space-after-navbar: 40px;
    --site-left-space: 10px;
    box-sizing: border-box;
    font-weight: 400;
    font-family: "Funnel Sans", "Arial";
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
