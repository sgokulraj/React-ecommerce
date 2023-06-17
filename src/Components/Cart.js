import { ListGroup, Row, Col, Image, Form } from "react-bootstrap";
import { CartContext } from "../Context/Context";
import { MdDelete } from "react-icons/md";
import  Footer  from "./Footer";
import { useState, useEffect } from "react";
import {Button} from "react-bootstrap";
import "./cart.css";


function Cart() {
  const {
    cartState: { cart },
    cartDispatch,
  } = CartContext();
  const [total, setTotal] = useState();
  useEffect(() => {
    setTotal(
      cart.reduce((acc, element) => acc + Number(element.price) * element.qty, 0)
    );
  }, [cart]);
  return (
    <div className="cartContainer">
      <ListGroup>
        {cart.map((prod) => {
          return (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col xs={2} md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col xs={3} md={3}>
                  <p>{prod.name}</p>
                </Col>
                <Col xs={2} md={2}>
                  <p>₹{prod.price}</p>
                </Col>
                <Col xs={3} md={3}>
                  <Form.Select
                    onChange={(e) =>
                      cartDispatch({
                        type: "CHANGE_QTY",
                        payload: { id: prod.id, qty: e.target.value },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((element) => {
                      return <option key={element + 1}>{element + 1}</option>;
                    })}
                  </Form.Select>
                </Col>
                <Col xs={2} md={2}>
                  <MdDelete
                    onClick={() =>
                      cartDispatch({ type: "REMOVE_FROM_CART", payload: prod })
                    }
                  />
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <div className="total">
        <p><strong>No. of items: {cart.length}</strong></p>
        <p><strong>Total: Rs. {total}</strong></p>
        <Button variant="primary">Proceed to Checkout</Button>
      </div>
    </div>
  );
}

export default Cart;
