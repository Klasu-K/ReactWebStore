import styled from "styled-components";
import { useState } from "react";

import productImages from "../assets/data/productImageURLs.json"
import Product from "./Product"
import ProductContainer from "./ProductContainer"
import LoadProductsBtn from "./LoadProductsBtn";
import productImage from "../assets/images/laptop.jpg"

import productQueries from "../services/productQueries"

interface Props {
  className?: string;
}
const ProductArea = ({ className }: Props) => {
  const [products, setProducts] = useState<Idata[]>([])

  //let imgURL = productImages.urls[0]
  let imgURL = productImage
  const pageSize = 15
  //counts page by amount of products loaded, propably very buggy later on
  const page = Math.floor(products.length/pageSize)
  const loadProductsClick = () => getItems(setProducts, page, pageSize)
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

//this is not doing anything usefull, just testing
const loadItem = (setter: React.Dispatch<React.SetStateAction<Idata[]>>, id:number) => {
  productQueries.getOne(id)
  .then((data) => {
    setter(products => products.concat(data))
  })
}

const getItems = (productSetter: React.Dispatch<React.SetStateAction<Idata[]>>, page: number, pageSize: number) => {
  const simpleFilter: [string, string[]][] = [["brand", ["ProCell", "EliteTech", "MegaPixel"]]];
  const rangeFilter: [string, number, number][] = [["storageCapacity", 100, 1000]]
  productQueries.getMany(page, pageSize, simpleFilter, rangeFilter)
  .then((data) => {
    productSetter(products => products.concat(data))
    console.log(data)
  })
}


const StyledProductArea = styled(ProductArea)`
  flex: 1;
  min-height: 90vh;
`;

const MockProduct = () => {
  let min = 0
  let max = 0
  let randomInt = Math.floor(Math.random() * (max - min + 1)) + min
  //let imgURL = productImages.urls[randomInt]
  let imgURL = productImage
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