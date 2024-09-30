import styled from "styled-components";
import { useState } from "react";

import productImages from "../assets/data/productImageURLs.json"
import Product from "./Product"
import ProductContainer from "./ProductContainer"
import LoadProductsBtn from "./LoadProductsBtn";

import productQueries from "../services/productQueries"

interface Props {
  className?: string;
}
const ProductArea = ({ className }: Props) => {
  const [products, setProducts] = useState<Idata[]>([])
  let imgURL = productImages.urls[0]
  //const loadProductsClick = () => loadItem(setProducts, 1)
  const loadProductsClick = () => getItems(1,5)
  return (
    <section className={className}>
      <ProductContainer>
        {products.map(product => 
          <Product
            key={product.id} 
            title={product.name} 
            imageURL={imgURL} 
            desc={product.description} 
            price={product.price}>
          </Product>
        )}
      </ProductContainer>
      <LoadProductsBtn onClick={loadProductsClick}/>
    </section>
  );
};

//this is not doint anything usefull, just testing
const loadItem = (setter: React.Dispatch<React.SetStateAction<Idata[]>>, id:number) => {
  productQueries.getOne(id)
  .then((data) => {
    setter(products => products.concat(data))
  })
}

const getItems = (page: number, pageSize: number) => {
  productQueries.getMany(page, pageSize)
  .then((data) => {console.log(data)})
}


const StyledProductArea = styled(ProductArea)`
  flex: 1;
  min-height: 90vh;
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