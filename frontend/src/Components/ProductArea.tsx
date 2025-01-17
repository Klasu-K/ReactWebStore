import styled from "styled-components";
import { useEffect, useState } from "react";

import Product from "./Product"
import ProductContainer from "./ProductContainer"

import productQueries from "../services/productQueries"

interface Props {
  className?: string;
  productFilters: productFilters;
}

type productSetter = React.Dispatch<React.SetStateAction<productData[]>>

const ProductArea = ({ className, productFilters}: Props) => {
  const [products, setProducts] = useState<productData[]>([])

  const pageSize = 100
  const page = 0 //supports pagination, not used currently due to small amount of products
  //TODO maybe add ordering option
  useEffect(() => {
    searchAndUpdateProducts(
      setProducts, page, pageSize, 
      {
        simpleFilters: productFilters.simpleFilters,
        rangeFilters: productFilters.rangeFilters,
      }
    )
  }, [productFilters])
  
  return (
    <section className={className}>
      <ProductContainer>
        {products.map((product, index) => 
          <Product
            key={product.id}
            productData={product}>
          </Product>
        )}
      </ProductContainer>
    </section>
  );
};

const searchAndUpdateProducts = (productSetter: productSetter, page: number, pageSize: number, productFilters: productFilters) => {
  const simpleFilters: simpleFilter[] = productFilters.simpleFilters
  const rangeFilters: rangeFilter[] = productFilters.rangeFilters

  productQueries.getMany(page, pageSize, simpleFilters, rangeFilters)
  .then((data) => {
    console.log(data)
    productSetter(data)
  })
}


const StyledProductArea = styled(ProductArea)`
  flex: 1;
  min-height: 90vh;
  width: 100%;
`;

export default StyledProductArea;