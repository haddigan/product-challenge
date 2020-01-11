import Dinero from "dinero.js";

const calculateDiscount = (price, coupon = 0) => {
  const priceInteger = Math.round(price * 100);
  const couponInteger = Math.round(coupon * 100);
  const discountedPrice = Dinero({ amount: priceInteger }).subtract(
    Dinero({ amount: couponInteger })
  );
  return discountedPrice.toFormat("$0,0.00");
};

export default calculateDiscount;
