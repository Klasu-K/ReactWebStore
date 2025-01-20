
import NavBar from "./NavBar"
import Footer from "./Footer"
import ProductSection from "./ProductSection"
import GlobalStyle from "./GlobalStyle"
import {ShowChildrenProvider} from "./showChildren/ShowChildrenContext"
import ProductSectionWrapper from "./ProductSectionWrapper"

const App = () => {

  return (
    <>
      <GlobalStyle/>
      <NavBar/>
      <main>
        <ShowChildrenProvider>
          <ProductSectionWrapper>
            <ProductSection/>
          </ProductSectionWrapper>
        </ShowChildrenProvider>
      </main>
      <Footer></Footer>
    </>
    
  )
}

export default App
