import { faker } from "@faker-js/faker";
import { createContext, useContext, useReducer } from "react";
import { cartReducer, productReducer } from "./Reducer";

export const Cart = createContext();

function Context({ children }) {
  faker.seed(999);
  const products = [...Array(20)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price().split(".")[0],
    image: faker.image.urlLoremFlickr({ category: "abstract" }),
    quickDelivery: faker.datatype.boolean(),
    inStock: faker.helpers.arrayElement([0, 2, 5, 6, 7]),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [cartState, cartDispatch] = useReducer(cartReducer, {
    product: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byQuickDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return (
    <Cart.Provider
      value={{ cartState, cartDispatch, productState, productDispatch }}
    >
      {children}
    </Cart.Provider>
  );
}

export function CartContext() {
  return useContext(Cart);
}

export default Context;
