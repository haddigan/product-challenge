import React, { useEffect, useState } from "react";
import { baseUrl } from "config.js";

import useFetch from "utils/hooks/useFetch";
import calculateSubtotal from "utils/calculateSubtotal";

import ProductList from "./ProductList";

const useCart = () => useFetch(`${baseUrl}/product/order.json`);

const useSubtotal = (cartProducts = []) => {
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    const calculatedSubtotal = calculateSubtotal(cartProducts);
    setSubtotal(calculatedSubtotal);
  }, [cartProducts]);
  return subtotal ? [subtotal.toFormat("$0,0.00")] : [null];
};

const Cart = () => {
  const { cart = {}, payment_method, postal_code, user } = useCart();
  const { products } = cart;
  const [subtotal] = useSubtotal(products);
  return (
    <section>
      <h1>Cart</h1>
      <div>{products && <ProductList products={products} />}</div>
      {subtotal && <div>subtotal: {subtotal}</div>}
    </section>
  );
};

export default Cart;
