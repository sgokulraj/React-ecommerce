import { CartContext } from "../Context/Context";
import Filter from "./Filter";
import SingleProduct from "./SingleProduct";
import "./home.css";
import { FiFilter } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {
  const {
    cartState: { product },
    productState: { byStock, byQuickDelivery, byRating, searchQuery, sort },
  } = CartContext();

  const [clicked, setClicked] = useState(false);
  const transformProducts = () => {
    let sortedProducts = product;
    if (sort === "lowToHigh") {
      sortedProducts = sortedProducts.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sort === "highToLow") {
      sortedProducts = sortedProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }

    if (byQuickDelivery) {
      sortedProducts = sortedProducts.filter((prod) => {
        return prod.quickDelivery === true;
      });
    }

    if (byStock) {
      sortedProducts = sortedProducts.filter((prod) => {
        return prod.inStock !== 0;
      });
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) => {
        return prod.name.toLowerCase().includes(searchQuery);
      });
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => {
        return prod.ratings === byRating;
      });
    }
    return sortedProducts;
  };
  return (
    <div className="home">
      <div className="filterContainer">
        <FiFilter className="filterbtn" onClick={() => setClicked(!clicked)} />
        {clicked && <Filter />}
      </div>
      <div className="productContainer">
        {transformProducts().map((prod) => (
          <SingleProduct prod={prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
