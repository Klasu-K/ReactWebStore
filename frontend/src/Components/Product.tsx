import styled from "styled-components"

interface productProps {
  className?: string;
  title : string; 
  imageURL: string;
  price: number;
  desc: string;
}



const Product = ({className, title, imageURL, price, desc}: productProps) => {
  return (
    <article className={className}>
      <div className="title-area">
        <h3 className="title">{title}</h3>
      </div>
      <img src={imageURL}></img>
      <div className="priceDiv">
        <h4 className="price">{price}€</h4>
      </div>
      <p className="description">{desc}</p>
    </article>
  )
}

const StyledProduct = styled(Product)`  

  //background-color: hsla(30, 25%, 75%, 0.3);
  background: rgb(254,248,239);
  background: linear-gradient(125deg, rgb(252 250 247) 0%, rgb(252 246 237) 100%);
  /* border: 1px solid #00000039; */
  display: inline-block;
  text-align: center;
  flex-basis: 250px;
  min-height:350px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.082);   
  }

  .priceDiv {
    background: rgb(198,112,0);
    background: linear-gradient(90deg, rgba(231,131,0,1) 0%, rgba(255,145,0,1) 15%, rgba(255,145,0,1) 85%, rgba(231,131,0,1) 100%);
    color: white;
  }

  .title-area {
    height: 4em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-size: 1.4em;
    font-weight: 600;
    padding: 5px;
  }
  .price {
    font-size: 1.4em;
  }

  .description {
    padding-top: 10px;
    font-weight: 400;
  }

  img {
    max-width: 100%;
    /* width: 100%; */
    /* max-height: 200px; */
    padding: 0 10px;
    
  }
`


export default StyledProduct