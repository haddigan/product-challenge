import React from "react";

const Product = ({ quantity, price }) => (
  <li>
    {quantity}x ${price}
  </li>
);

export default Product;
