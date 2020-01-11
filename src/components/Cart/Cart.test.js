import React from "react";
import { render } from "@testing-library/react";

import Cart from "./Cart";

it("renders properly", () => {
  const { getByText } = render(<Cart />);

  expect(getByText("Cart")).toBeTruthy();
});
