import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { Button, Modal, Row, Col, Image } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { BsFillCartFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import "./header.css";
import { CartContext } from "../Context/Context";
import { auth, db } from "../firebase-config/firebase-config";
import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";

function Header() {
  const {
    cartState: { cart },
    cartDispatch,
    productDispatch,
  } = CartContext();

  const [searchParams] = useSearchParams();
  const [uname, setUname] = useState("");
  const [uid] = useState(searchParams.get("ud"));

  useEffect(() => {
    getUsername();
  });

  function getUsername() {
    const ud = searchParams.get("ud");
    const username = ref(db, "users/" + ud);
    onValue(username, (snapshot) => {
      const data = snapshot.val();
      setUname(data?.username.toUpperCase());
    });
  }

  function logout() {
    signOut(auth)
      .then(() => {
        alert("Sign-out successful");
        window.location.href = "./";
      })
      .catch((error) => {
        // An error happened.
      });
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar variant="dark" className="p-3 header">
        <Container style={{ paddingLeft: "5px", paddingRight: "5px" }}>
          <Navbar.Brand style={{ marginRight: "5px" }}>
            <Link to={`/?ud=${uid}`} className="title">
              <h2>Shopazon</h2>
            </Link>
          </Navbar.Brand>
          <Nav style={{ width: "30%" }}>
            <Form>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                style={{ paddingRight: "5px" }}
                onChange={(e) =>
                  productDispatch({
                    type: "FILTER_BY_SEARCH",
                    payload: e.target.value,
                  })
                }
              />
            </Form>
          </Nav>
          {/* <Dropdown drop="start" className="dropd">
            <Dropdown.Toggle variant="success" id="dropdown-autoclose-inside">
              <BsFillCartFill className="cartIcon" />
              <Badge bg="info">{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropDown" >
              {cart.length ? (
                cart.map((product) => {
                  return (
                    <Dropdown.Item key={product.id} className="cartContainer">
                      <img src={product.image} alt={product.id} />
                      <div className="cartInfo">
                        <p>{product.name}</p>
                        <p>₹{product.price}</p>
                      </div>
                      <MdDelete
                        onClick={() =>
                          cartDispatch({
                            type: "REMOVE_FROM_CART",
                            payload: product,
                          })
                        }
                      />
                    </Dropdown.Item>
                  );
                })
              ) : (
                <Dropdown.Item>Empty Cart</Dropdown.Item>
              )}
              {cart.length ? (
                <Link to={`/cart?ud=${uid}`}>
                  <Button variant="secondary">Go to Cart</Button>
                </Link>
              ) : (
                <></>
              )}
            </Dropdown.Menu>
          </Dropdown> */}
          <>
            <div className="iconContainer" onClick={handleShow}>
              <BsFillCartFill className="cartIcon" />
              <Badge bg="info">{cart.length}</Badge>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Cart Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {cart.length ? (
                  cart.map((product) => {
                    return (
                      <div key={product.id}>
                        <Row>
                          <Col xs={3} md={3}>
                            <Image
                              src={product.image}
                              alt={product.id}
                              fluid
                              rounded
                            />
                          </Col>

                          <Col xs={5} md={5}>
                            <p>{product.name}</p>
                          </Col>
                          <Col xs={3} md={3}>
                            <p>₹{product.price}</p>
                          </Col>

                          <Col xs={1} md={1}>
                            <MdDelete
                              onClick={() =>
                                cartDispatch({
                                  type: "REMOVE_FROM_CART",
                                  payload: product,
                                })
                              }
                            />
                          </Col>
                        </Row>
                        <hr />
                      </div>
                    );
                  })
                ) : (
                  <div>Empty Cart</div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {cart.length ? (
                  <Link to={`/cart?ud=${uid}`}>
                    <Button variant="primary" onClick={handleClose}>
                      Go to Cart
                    </Button>
                  </Link>
                ) : (
                  <></>
                )}
              </Modal.Footer>
            </Modal>
          </>

          {searchParams.get("ud") !== null ? (
            <>
              <Dropdown drop="start">
                <Dropdown.Toggle>
                  <FaUserAlt className="userIcon" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    Welcome <strong>{uname}</strong>
                  </Dropdown.Item>
                  <Dropdown.Item href={`./profile?ud=${uid}`}>
                    View Profile
                  </Dropdown.Item>
                  {/* <Dropdown.Item href={`./userinfo?ud=${uid}`}>View Profile</Dropdown.Item> */}

                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <Button variant="secondary">
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "white" }}
              >
                SignIn
              </Link>
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
