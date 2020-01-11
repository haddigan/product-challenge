import React, { useEffect, useState } from "react";
import axios from "axios";
import Dinero from "dinero.js";
import { baseUrl } from "config.js";

import ProductList from "./ProductList";

const useFetchCart = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(`${baseUrl}/product/order.json`);
      setData(data);
    };
    fetch();
  }, []);
  return data;
};

const useSubtotal = (cartProducts = []) => {
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
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
    setSubtotal(subtotal);
  }, [cartProducts]);
  return subtotal ? [subtotal.toFormat("$0,0.00")] : [null];
};

const Cart = () => {
  const { cart = {}, payment_method, postal_code, user } = useFetchCart();
  const { products } = cart;
  const [subtotal] = useSubtotal(products);
  return (
    <section>
      <h1>Cart</h1>
      <div>
        {products && <ProductList products={products} />}
        {JSON.stringify({ payment_method, postal_code, user })}
      </div>
      {subtotal && <div>subtotal: {subtotal}</div>}
    </section>
  );
};

export default Cart;
