import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Error from "./Components/Error";
import SignIn from "./Components/SignIn";
import Register from "./Components/Register";
import Profile from './Components/Profile';

function App() {
  return ( 
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
