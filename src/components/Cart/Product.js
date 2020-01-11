import React from "react";
import DiscountedPrice from "./DiscountedPrice";

import stripTags from "utils/stripTags";

const Product = ({ quantity, price, couponPrice, details }) => {
  const { images, name, description, size } = details;
  const [image] = images;

  return (
    <li>
      <img src={image.thumb} alt={name} />
      <dl>
        <dt>Product Name:</dt>
        <dd>{name}</dd>
        <dt>Quantity:</dt>
        <dd>{quantity}</dd>
        <dt>Price:</dt>
        <dd>
          {couponPrice ? (
            <DiscountedPrice price={price} coupon={couponPrice} />
          ) : (
            <span>{price}</span>
          )}
        </dd>
        <dt>Description:</dt>
        <dd>{stripTags(description)} </dd>
        {size && (
          <>
            <dt>Size:</dt>
            <dd>{size}</dd>
          </>
        )}
      </dl>
    </li>
  );
};

export default Product;
