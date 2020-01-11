import React from "react";
import calculateDiscount from "utils/calculateDiscount";

const DiscountedPrice = ({ price, coupon }) => {
  return (
    <span>
      <span style={{ textDecoration: "strikethrough" }}>{price}</span>{" "}
      {calculateDiscount(price, coupon)}
    </span>
  );
};

export default DiscountedPrice;
