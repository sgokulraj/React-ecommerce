import { Button, Card } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { CartContext } from "../Context/Context";
import Rating from "./Rating";
import "./singleProduct.css";
import { useSearchParams, useNavigate } from "react-router-dom";

function SingleProduct({ prod }) {
  // console.log(prod);
  const {
    cartState: { cart },
    cartDispatch,
  } = CartContext();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <Card className="cardy">
      <Card.Img variant="top" src={prod.image} alt={prod.id} />
      <Card.Body>
        <Card.Title>{prod.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">₹{prod.price}</Card.Subtitle>
        <Card.Text>
          {prod.quickDelivery ? "Fast Delivery" : "Standard Delivery"}
          <br />
          <Rating rating={prod.ratings} />
        </Card.Text>

        {prod.inStock ? (
          cart.some((p) => p.id === prod.id) ? (
            <Button
              variant="danger"
              onClick={() => {
                searchParams.get("ud") !== null
                  ? cartDispatch({ type: "REMOVE_FROM_CART", payload: prod })
                  // : (window.location.href = "./signin");
                  : navigate("/signin");

              }}
            >
              Remove from cart{" "}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                searchParams.get("ud") !== null
                  ? cartDispatch({ type: "ADD_TO_CART", payload: prod })
                  // : (window.location.href = "./signin");
                  : navigate("/signin");
              }}
            >
              Add to cart
            </Button>
          )
        ) : (
          <Alert variant="danger" style={{ minHeight: "50px" }}>
            Out of Stock!!!
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default SingleProduct;
