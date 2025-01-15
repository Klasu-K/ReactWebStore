import { createGlobalStyle } from 'styled-components'
import funnelSansFont from "../assets/fonts/Funnel_Sans/FunnelSans-VariableFont_wght.ttf"

const GlobalStyle = createGlobalStyle<{}>`
  @font-face {
      font-family: "Funnel Sans";
      src: url(${funnelSansFont});
  }

  :root {
    --navbar-height: 50px;
    --navbar-color: #dadada;
    --footer-color: #2c2e30;
    --space-after-navbar: 40px;
    --site-left-space: 10px;
    --site-min-right-space: 50px;
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

export default GlobalStyle