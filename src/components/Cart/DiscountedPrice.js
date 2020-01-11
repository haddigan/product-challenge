import React from "react";
import calculateDiscount from "utils/calculateDiscount";

const DiscountedPrice = ({ price, coupon }) => {
  return (
    <span>
      <span style={{ textDecoration: "line-through" }}>{price}</span>{" "}
      {calculateDiscount(price, coupon)}
    </span>
  );
};

export default DiscountedPrice;
