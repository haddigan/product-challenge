import Dinero from "dinero.js";

const calculateSubtotal = cartProducts => {
  const initial = Dinero({ amount: 0, currency: "USD" });

  const subtotal = cartProducts.reduce((accumulatedTotal, currentItem) => {
    const { price, quantity } = currentItem;

    const integerPrice = Math.round(price * 100);
    const itemTotal = Dinero({
      amount: integerPrice,
      currency: "USD"
    }).multiply(quantity);
    return accumulatedTotal.add(itemTotal);
  }, initial);
  return subtotal;
};

export default calculateSubtotal;
