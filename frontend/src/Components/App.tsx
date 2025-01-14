
import NavBar from './NavBar'
import Footer from './Footer'
import StyledProductSection from './ProductSection'
import GlobalStyle from './GlobalStyle'
import {ShowChildrenProvider} from './showChildren/ShowChildrenContext'

const App = () => {

  return (
    <>
      <GlobalStyle/>
      <NavBar/>
      <main>
        <ShowChildrenProvider>
          <StyledProductSection/>
        </ShowChildrenProvider>
      </main>
      <Footer></Footer>
    </>
    
  )
}

export default App
