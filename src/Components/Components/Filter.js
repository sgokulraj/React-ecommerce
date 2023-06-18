import "./filter.css";
import { CartContext } from "../Context/Context";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
function Filter() {
  const {
    productState: { byStock, byQuickDelivery, byRating, sort },
    productDispatch,
  } = CartContext();

  return (
    <div className="filter">
      <h4 className="mb-4">Filter</h4>
      <div>
        <p className="mb-0"><strong><i>By Price</i></strong></p>
        <Form.Check
          inline
          label="Low to High"
          name="group1"
          type="radio"
          id="radio-1"
          onChange={() =>
            productDispatch({ type: "SORT_BY_PRICE", payload: "lowToHigh" })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
        <Form.Check
          inline
          label="High to Low"
          name="group1"
          type="radio"
          id="radio-2"
          onChange={() =>
            productDispatch({ type: "SORT_BY_PRICE", payload: "highToLow" })
          }
          checked={sort === "highToLow" ? true : false}
        />
      </div>
      <hr/>
      <div className="mb-3">
        <p className="mb-0"><strong><i>Others</i></strong></p>
        <Form.Check
          inline
          label="Exclude out of Stock"
          name="group2"
          type="checkbox"
          id="check-1"
          onChange={() => productDispatch({ type: "FILTER_BY_STOCK" })}
          checked={byStock}
        />
        <Form.Check
          inline
          label="Quick Delivery only"
          name="group2"
          type="checkbox"
          id="check-2"
          onChange={() => productDispatch({ type: "FILTER_BY_DELIVERY" })}
          checked={byQuickDelivery}
        />
      </div>
      <hr/>
      <div>
      <p className="mb-0"><strong><i>By Ratings</i></strong></p>
        <Rating
          rating={byRating}
          change={(i) =>
            productDispatch({ type: "FILTER_BY_RATING", payload: i + 1 })
          }
        />
      </div>
      <Button
        variant="primary"
        className="mt-4"
        onClick={() => productDispatch({ type: "CLEAR_FILTERS" })}
      >
        Clear all Filters
      </Button>
    </div>
  );
}

export default Filter;
