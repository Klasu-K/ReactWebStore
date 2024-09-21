import styled from "styled-components";
import { useState } from "react";

import productImages from "../assets/data/productImageURLs.json"
import Product from "./Product"
import ProductContainer from "./ProductContainer"
import LoadProductsBtn from "./LoadProductsBtn";

interface Props {
  className?: string;
}

const ProductArea = ({ className }: Props) => {
  const [loadAmount, setLoadAmount] = useState(1)
  
  return (
    <section className={className}>
      <ProductContainer>
              {Array(loadAmount).fill(1).map((_, index) => (
                <MockProduct key={index}/>
              ))}
      </ProductContainer>
      <LoadProductsBtn funct={() => setLoadAmount(loadAmount+1)}/>
    </section>
  );
};

const StyledProductArea = styled(ProductArea)`
`;

const MockProduct = () => {
  let min = 0
  let max = 10
  let randomInt = Math.floor(Math.random() * (max - min + 1)) + min
  let imgURL = productImages.urls[randomInt]
  return(
    <Product 
    title="gaming pc" 
    imageURL={imgURL} 
    desc={"this is cheap".repeat(randomInt)} 
    price={200}>
    </Product>
  )
}


export default StyledProductArea;