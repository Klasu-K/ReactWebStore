import styled from "styled-components"
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

interface productProps {
  className?: string;
  productData: productData;
}


const Product = ({className, productData}: productProps) => {
  

  const myImage = getImage(productData.numberId + 1)
  return (
    <article className={className}>
      <div className="image-area">
        <AdvancedImage className="product-image" cldImg={myImage}/>
        <div className="description-area">
          <p className="description">{productData.description}</p>
        </div>
      </div>
      <div className="info-area">
        <h3 className="title">{productData.name}</h3>
        <h4 className="price">{productData.price}€</h4>
        <div className="info-specs">
          <div className="storage-capacity specs-text">{productData["storage capacity"]}GB</div>
          <div className="battery-capacity specs-text">{productData["battery capacity"]}mAh</div>
          <div className="operating-system specs-text">{productData["operating system"]}</div>
          <div className="camera-type specs-text">{productData["camera type"]}</div>
        </div>
      </div>
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
  myImage.resize(fill().width(400).height(400));
  return myImage
}

const StyledProduct = styled(Product)`  
  /* background: var(--test-product-color); */
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.265);
  border-radius: 8px 8px 3px 3px;
  overflow: hidden;
  padding-bottom: 3px;
  display: inline-block;
  text-align: center;
  &:hover {
    box-shadow: 0px 1px 8px 3px rgba(0, 0, 0, 0.397);
    filter: contrast(120%);
    .description-area {
      background-color: #ffffff8e;
      opacity: 1;
    } 
  }

  .description-area {
    transition: all 0.3s;
    position: absolute;
    backdrop-filter: blur(4px);
    opacity: 0;
    inset: 0;
  }

  .info-area {
    text-align: left;
  }
  
  .title {
    font-size: 18px;
    font-weight: 400;
    padding-left: 5px;
  }

  .price {
    font-weight: 400;
    color: #212121;
    font-size: 15px;
    padding-left: 10px;
  }

  .info-specs {
    color: #3e3e3e;
    padding-left: 10px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 5px;
  }

  .specs-text {
    font-size: 12px;
    white-space: nowrap;
  }

  .image-area {
    position: relative;
  }

  .product-image {
    max-width: 100%;
    padding: 0 0px;
  }

  

  .description {
    padding-top: 50px;
    font-weight: 400;
  }

`


export default StyledProduct