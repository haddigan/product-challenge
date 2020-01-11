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
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [cart, setCart] = useState({ products: [] });
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderEndpoint = `${baseUrl}/product/order.json`;
        const { data: cartData } = await axios.get(orderEndpoint);
        const { cart } = cartData;

        const productIdArray = cart.products.map(
          ({ product_id }) => product_id
        );
        const productIdString = productIdArray.join(",");
        const productEndpoint = `${prodBaseUrl}?location_id=${locationId}&product_id=${productIdString}`;

        const { data: productData } = await axios.get(productEndpoint);
        const { products } = productData;
        setCart(cart);
        setProductDetails(products);
        setLoading(false);
      } catch (err) {
        setHasError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [subtotal] = useSubtotal(cart.products);
  return (
    <section>
      <h1>Cart</h1>
      {hasError && <p>Error!</p>}
      <div>
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            <ProductList
              products={cart.products}
              productDetails={productDetails}
            />
            {subtotal && <div>Subtotal: {subtotal}</div>}
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
