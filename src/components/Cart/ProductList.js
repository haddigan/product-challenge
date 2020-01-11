import React from "react";

import Product from "./Product";

const ProductList = ({ products, productDetails }) => {
  const renderProducts = products => {
    return products.map(({ quantity, product_id: id, price }) => {
      const details = productDetails.find(
        ({ product_id }) => product_id === id
      );

      return (
        <Product key={id} price={price} quantity={quantity} details={details} />
      );
    });
  };
  return <ul>{renderProducts(products)}</ul>;
};

export default ProductList;
