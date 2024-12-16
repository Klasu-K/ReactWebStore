import styled from "styled-components";
import { useEffect, useState } from "react";

import productImages from "../assets/data/productImageURLs.json"
import Product from "./Product"
import ProductContainer from "./ProductContainer"
import LoadProductsBtn from "./LoadProductsBtn";
import productImage from "../assets/images/laptop.jpg"

import productQueries from "../services/productQueries"

interface Props {
  className?: string;
  productFilters: productFilters;
}
const ProductArea = ({ className, productFilters}: Props) => {
  const [products, setProducts] = useState<Idata[]>([])

  //let imgURL = productImages.urls[0]
  let imgURL = productImage
  const pageSize = 100
  //counts page by amount of products loaded, propably very buggy later on
  const page = Math.floor(products.length/pageSize)
  useEffect(() => {
    searchAndUpdateProducts(
      setProducts, page, pageSize, 
      {
        simpleFilters: productFilters.simpleFilters,
        rangeFilters: productFilters.rangeFilters,
      }
    )
  }, [productFilters])
  
  const loadProductsClick = () => {
    productQueries.getFilters()
    .then(filters => console.log(filters))
  }
  
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

const searchAndUpdateProducts = (productSetter: React.Dispatch<React.SetStateAction<Idata[]>>, page: number, pageSize: number, productFilters: productFilters) => {
  const simpleFilter: simpleFilters = productFilters.simpleFilters
  const rangeFilter: rangeFilters = productFilters.rangeFilters

  productQueries.getMany(page, pageSize, simpleFilter, rangeFilter)
  .then((data) => {
    productSetter(data)
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