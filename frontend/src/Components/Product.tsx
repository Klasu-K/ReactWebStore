import styled from "styled-components"
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

interface productProps {
  className?: string;
  title : string; 
  imageNumber: number;
  price: number;
  desc: string;
}


const Product = ({className, title, imageNumber, price, desc}: productProps) => {
  

  const myImage = getImage(imageNumber)
  return (
    <article className={className}>
      <div className="title-area">
        <h3 className="title">{title}</h3>
      </div>
      <AdvancedImage className="product-image" cldImg={myImage}/>
      <div className="priceDiv">
        <h4 className="price">{price}€</h4>
      </div>
      <p className="description">{desc}</p>
    </article>
  )
}

const getImage = (imageNumber: number) => {
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: "dlmnpup7q" //TODO store cloudName elsewhere
    }
  });
  let myImage = cloudinary.image(`products/phone-${imageNumber}`); 
  myImage.resize(fill().width(300).height(300));
  return myImage
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
  box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.05);
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
    text-shadow: 1px 1px 1px #c2c2c2dc;
    padding: 5px;
  }
  .price {
    font-size: 1.4em;
    text-shadow: 1px 1px 1px #ffffff63;
  }

  .description {
    padding-top: 10px;
    font-weight: 400;
  }

  .product-image {
    max-width: 100%;
    padding: 0 0px;
  }
`


export default StyledProduct