import styled from "styled-components"

interface productProps {
  className?: string;
  title : string; 
  imageURL: string;
  price: number;
  desc: string;
}



const Product = ({className, title, imageURL, price, desc, }: productProps) => {
  return (
    <article className={className}>
      <h3>{title}</h3>
      <img src={imageURL}></img>
      <div id="priceDiv">
        <h4>{price}€</h4>
      </div>
      <p>{desc}</p>
    </article>
  )
}

const StyledProduct = styled(Product)`
  /* background-color: hsla(30, 25%, 75%, 0.3); */
  border: 3px solid #000000;
  display: inline-block;
  text-align: center;
  /* width: 250px;
  max-width: 400px;
  min-height:400px; */
  &:hover {
    background-color: rgba(0, 0, 0, 0.082);   
  }

  #priceDiv {
    background-color: #ff9100;
    color: white;
  }
  h3 {
    font-size: 2.5em;
  }
  h4 {
    font-size: 1.4em;
  }
  img {
    max-width: 100%;
    /* width: 100%; */
    /* max-height: 200px; */
    padding: 0 10px;
    
  }
`


export default StyledProduct