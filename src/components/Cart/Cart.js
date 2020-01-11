import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "config.js";

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

const Cart = () => {
  const { cart, payment_method, postal_code, user } = useFetchCart();

  return (
    <div>
      <h1>Cart</h1>
      <div>{JSON.stringify({ cart, payment_method, postal_code, user })}</div>
    </div>
  );
};

export default Cart;
