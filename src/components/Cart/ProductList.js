import React from "react";

import Product from "./Product";

const ProductList = ({ products }) => {
  const renderProducts = products => {
    return products.map(({ quantity, product_id: id, price }) => {
      return <Product key={id} price={price} quantity={quantity} />;
    });
  };
  return <ul>{renderProducts(products)}</ul>;
};

export default ProductList;
