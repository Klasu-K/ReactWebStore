import styled from "styled-components";
import { useEffect, useState } from "react";

import Product from "./Product"
import ProductContainer from "./ProductContainer"
import LoadProductsBtn from "./LoadProductsBtn";

import productQueries from "../services/productQueries"

interface Props {
  className?: string;
  productFilters: productFilters;
}
const ProductArea = ({ className, productFilters}: Props) => {
  const [products, setProducts] = useState<Idata[]>([])

  const pageSize = 100
  //counts page by amount of products loaded, propably very buggy later on //TODO
  
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
        {products.map((product, index) => 
          <Product
            key={product.id} 
            title={product.name} 
            imageNumber={product.numberId + 1} 
            desc={product.description} 
            price={product.price}>
          </Product>
        )}
      </ProductContainer>
      <LoadProductsBtn onClick={loadProductsClick}/>
    </section>
  );
};

const searchAndUpdateProducts = (productSetter: React.Dispatch<React.SetStateAction<Idata[]>>, page: number, pageSize: number, productFilters: productFilters) => {
  const simpleFilter: simpleFilter[] = productFilters.simpleFilters
  const rangeFilter: rangeFilter[] = productFilters.rangeFilters

  productQueries.getMany(page, pageSize, simpleFilter, rangeFilter)
  .then((data) => {
    productSetter(data)
  })
}


const StyledProductArea = styled(ProductArea)`
  flex: 1;
  min-height: 90vh;
  width: 100%;
`;

export default StyledProductArea;