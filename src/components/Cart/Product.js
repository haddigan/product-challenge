import React from "react";

import stripTags from "utils/stripTags";

const Product = ({ quantity, price, details }) => {
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
        <dt>Total Price:</dt>
        <dd>{price}</dd>
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
