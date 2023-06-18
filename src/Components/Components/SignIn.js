import "./sign.css";
import { Link } from "react-router-dom";
import { auth } from "../firebase-config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

function SignIn() {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const [error , setError] = useState("");

  function handleCred(e) {
    let name = e.target.name;
    let value = e.target.value;
    setCredential((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  }

  function handleSubmit(e){
    e.preventDefault();
    if(credential.email === "" || credential.password === ""){
      setError("Enter valid email and password")
    }else{
      signInWithEmailAndPassword(auth, credential.email , credential.password)
        .then((userCredential)=>{
          const user = userCredential.user.uid;
          alert("Logged-in successfully");
          window.location.href=`./?ud=${user}`
        })
        .catch((err)=>{
          setError(err)
        })
    }
  }

  function handleReset(e){
    e.preventDefault();
    setCredential({
      email:"",
      password:""
    })
  }
  return (
    <div className="mainCo">
      <h1 className="h2 mb-3 fw-normal title">Sign in</h1>
      <div className="form-signin w-100 m-auto container-sm">
        <form action="#" id="form" method="post">
          <div className="form-floating mb-4 ">
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              value={credential.email}
              onChange={handleCred}
              placeholder="name@example.com"
              required
            />
            <label htmlFor="email">
              Email<sup>*</sup>
            </label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={credential.password}
              onChange={handleCred}
              placeholder="Password"
              required
            />
            <label htmlFor="password">
              Password<sup>*</sup>
            </label>
          </div>
          <div id="btns">
            <button
              type="submit"
              id="submitBtn"
              className="w-10 btn  mx-3 button"
              onClick={handleSubmit}
            >
              Submit
            </button>

            <button type="reset" id="clearBtn" className="w-10 btn button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
        <p id="error">{error}</p>
      </div>
      <hr />
      <p>
        Not Registered? <Link to="/register">Click here</Link>
      </p>
    </div>
  );
}

export default SignIn;
