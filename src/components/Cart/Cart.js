import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, prodBaseUrl, locationId } from "config.js";

import calculateSubtotal from "utils/calculateSubtotal";

import ProductList from "./ProductList";

const useSubtotal = (cartProducts = []) => {
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    const calculatedSubtotal = calculateSubtotal(cartProducts);
    setSubtotal(calculatedSubtotal);
  }, [cartProducts]);
  return subtotal ? [subtotal.toFormat("$0,0.00")] : [null];
};

const Cart = () => {
  const [isLoading, setLoading] = useState([]);
  const [cart, setCart] = useState({ products: [] });
  const [productDetails, setProductDetails] = useState([]);
  const { products } = cart;

  useEffect(() => {
    const fetchData = async () => {
      const orderEndpoint = `${baseUrl}/product/order.json`;
      const { data } = await axios.get(orderEndpoint);
      const { cart } = data;
      setCart(cart);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const productIdArray = cart.products.map(({ product_id }) => product_id);
    const productIdString = productIdArray.join(",");
    const productEndpoint = `${prodBaseUrl}?location_id=${locationId}&product_id=${productIdString}`;

    const fetchData = async () => {
      const { data } = await axios.get(productEndpoint);
      setProductDetails(data);
    };
    fetchData();
  }, [products]);

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
