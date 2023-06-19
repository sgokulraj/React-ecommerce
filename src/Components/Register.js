import "./register.css";
import { Link,useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useState } from "react";

function Register() {
  const [formfields, setFormfields] = useState({
    username: "",
    dob: "",
    email: "",
    password: "",
    gender: "",
    address: "",
  });

  const navigate = useNavigate()

  function handleform(e) {
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;
    setFormfields((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  }

  function createUser(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formfields.email, formfields.password)
      .then((userCredential) => {
        const user = userCredential.user.uid;
        set(ref(db, "users/" + user), formfields);
        alert("user created successfully");
        setTimeout(() => {
          // window.location.href = "./signin";
          navigate("/signin")
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function reset() {
    setFormfields({
      username: "",
      dob: "",
      email: "",
      password: "",
      gender: "",
      address: "",
    });
  }
  return (
    <div className="main">
      <h2 className="mb-3 title">SignUp</h2>
      <form action="#" id="form">
        <div className="form-floating mb-3">
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            placeholder="name@example.com"
            value={formfields.username}
            onChange={handleform}
            required
          />
          <label htmlFor="username">Username</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="date"
            name="dob"
            id="dob"
            className="form-control"
            placeholder="name@example.com"
            value={formfields.dob}
            onChange={handleform}
          />
          <label htmlFor="dob">Date of Birth:</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="name@example.com"
            value={formfields.email}
            onChange={handleform}
            required
          />
          <label htmlFor="email">
            Email<sup>*</sup>
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={formfields.password}
            onChange={handleform}
            placeholder="Password"
          />
          <label htmlFor="password">
            Password<sup>*</sup>
          </label>
        </div>

        <div>
          Gender
          <div id="gender" className="my-3">
            <div className="form-check px-2 mx-3">
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={formfields.gender === "male"}
                onChange={handleform}
                className="form-check-input"
              />
              <label htmlFor="male" className="form-check-label">
                Male
              </label>
            </div>
            <div className="form-check px-2 mx-3 ">
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={formfields.gender === "female"}
                onChange={handleform}
                className="form-check-input"
              />
              <label htmlFor="female" className="form-check-label">
                Female
              </label>
            </div>
            <div className="form-check px-2 mx-3">
              <input
                type="radio"
                name="gender"
                id="others"
                value="others"
                checked={formfields.gender === "others"}
                onChange={handleform}
                className="form-check-input"
              />
              <label htmlFor="others" className="form-check-label">
                Others
              </label>
            </div>
          </div>
        </div>

        <div className="form-floating mb-3">
          <textarea
            name="address"
            id="address"
            cols="10"
            rows="0"
            wrap="hard"
            className="form-control"
            placeholder="Enter your Address"
            value={formfields.address}
            onChange={handleform}
          ></textarea>
          <label htmlFor="address">Address</label>
        </div>
        <div id="btns">
          <div className="me-2">
            <button
              type="submit"
              id="submitBtn"
              className="w-10 btn button"
              onClick={createUser}
            >
              Submit
            </button>
          </div>
          <div>
            <button
              type="reset"
              id="clearBtn"
              className="w-10 btn button"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
      <p id="error"></p>

      <hr />
      <p>
        Already Registered? <Link to="/signin">Click here</Link>
      </p>
    </div>
  );
}

export default Register;
