import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Error from "./Components/Error";
import SignIn from "./Components/SignIn";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import Protected from "./Components/Protected";

function App() {
  // const [isSignedIn, setIsSignedIn] = useState(null)
  // const signin = () => {
  //   setIsSignedIn(true)
  // }
  // const signout = () => {
  //   setIsSignedIn(false)
  // }
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cart"
          element={
            <Protected>
              <Cart />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
