
import NavBar from "./mainSections/NavBar"
import Footer from "./mainSections/Footer"
import ProductSection from "./mainSections/productSection/ProductSection"
import GlobalStyles from "./GlobalStyles"
import {ShowChildrenProvider} from "./showChildren/ShowChildrenContext"
import ProductSectionWrapper from "./mainSections/productSection/ProductSectionWrapper"

const App = () => {

  return (
    <>
      <GlobalStyles/>
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
