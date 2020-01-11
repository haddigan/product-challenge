import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "config.js";

import calculateSubtotal from "utils/calculateSubtotal";

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
    const calculatedSubtotal = calculateSubtotal(cartProducts);
    setSubtotal(calculatedSubtotal);
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
      <div>{products && <ProductList products={products} />}</div>
      {subtotal && <div>subtotal: {subtotal}</div>}
    </section>
  );
};

export default Cart;
