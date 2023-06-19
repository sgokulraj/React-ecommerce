import "./profile.css";
import { ref, onValue, update } from "firebase/database";
import {deleteUser} from "firebase/auth"
import { auth, db } from "../firebase-config/firebase-config";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile() {
  const [searchParams] = useSearchParams();
  const navigate =useNavigate()
  // const [uid] = useState(searchParams.get("ud"));
  const [disable, setDisable] = useState(true);
  const [user, setUser] = useState({
    username: "",
    dob: "",
    email: "",
    gender: "",
    address: "",
  });

  function getData() {
    const ud = searchParams.get("ud")
    const userDetails = ref(db, "users/" + ud);
    onValue(userDetails, (snapshot) => {
      const data = snapshot.val();
      setUser({
        username: data?.username,
        dob: data?.dob,
        email: data?.email,
        gender: data?.gender,
        address: data?.address,
      });
    });
  }

  useEffect(() => {
    getData();
  }, []);

  function editData(e) {
    e.preventDefault();
    setDisable(false);
  }

  function handleData(e) {
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;
    setUser((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  }

  function updateData() {
    const uid = searchParams.get("ud")
    const updates = {};
    updates["/users/" + uid] = user;
    update(ref(db), updates);
    alert("Your Profile is Updated :)");
    // window.location.reload();
    setDisable(true);
    navigate(`/profile?ud=${uid}`)
  }

  function deleteData(e) {
    e.preventDefault();
    let response = window.confirm("Are you sure about deleting your Account");
    if (response) {
      //for deleting the data in DB
      const uid = searchParams.get("ud")
      const updates = {};
      updates["/users/" + uid] = null;
      update(ref(db), updates);

      //For deleting the data in auth
      const removeUser = auth?.currentUser;
      deleteUser(removeUser)
        .then(() => {
          alert("your account is deleted!!! We miss you :( ");
          window.location.href = "./";
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  return (
    <div className="main">
      <h2 style={{ textAlign: "center" }} className="mb-3">
        Your Profile
      </h2>
      <form action="#" id="form">
        <div className="form-floating mb-3">
          <input
            type="text"
            name="username"
            id="username"
            value={user.username}
            className="form-control text-capitalize"
            placeholder="name@example.com"
            disabled={disable}
            onChange={handleData}
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="date"
            name="dob"
            id="dob"
            className="form-control"
            value={user.dob}
            placeholder="name@example.com"
            disabled={disable}
            onChange={handleData}
          />
          <label htmlFor="dob">Date of Birth</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            className="form-control"
            placeholder="name@example.com"
            disabled
          />
          <label htmlFor="email">Email</label>
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
                checked={user.gender === "male"}
                onChange={handleData}
                disabled={disable}
              />
              <label htmlFor="male" className="form-check-label">
                Male
              </label>
            </div>
            <div className="form-check px-2 mx-3">
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={user.gender === "female"}
                onChange={handleData}
                disabled={disable}
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
                checked={user.gender === "others"}
                onChange={handleData}
                disabled={disable}
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
            value={user.address}
            placeholder="Leave a comment here"
            onChange={handleData}
            disabled={disable}
          ></textarea>
          <label htmlFor="address">Address</label>
        </div>
        <div id="btns">
          <div className="me-2">
            <button
              type="submit"
              id="edit"
              className="w-10 btn"
              style={{ backgroundColor: "navy", color: "white" }}
              onClick={editData}
            >
              Edit
            </button>
          </div>
          <div className="me-2">
            <button
              type="reset"
              id="save"
              className="w-10 btn"
              style={{ backgroundColor: "navy", color: "white" }}
              onClick={updateData}
            >
              Save
            </button>
          </div>
          <div>
            <button
              type="reset"
              id="deleteAcc"
              className="w-10 btn"
              style={{ backgroundColor: "navy", color: "white" }}
              onClick={deleteData}
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
