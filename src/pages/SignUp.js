import { useState } from "react";
import { useNavigate } from "react-router-dom";
// authentication imports
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// adding data to db imports
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

import GoogleAuth from "../components/GoogleAuth";

function SignUp({ setLoggedIn }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // firebase authentication
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // getting a user credentials
      const user = userCredential.user;
      // We are setting a display name for the user
      // You can always get a user credentials with auth.currentUser
      updateProfile(auth.currentUser, { displayName: name });
      // copying a form data (we don't want to manipulate state)
      const formCopy = { ...formData };
      // we don't want to add a password to the database, we need to delete it
      delete formCopy.password;
      // we add a timestamp to data copy. It gets set (server timestamp) when it's submitted
      formCopy.timestamp = serverTimestamp();
      // setDoc is updating a database and add our user to the user's collection
      // You can check your collection in Firestore Database
      // doc(db from config, name of collection, unique element idetifier)
      // setDoc(doc(), dataObject)
      await setDoc(doc(db, "users", user.uid), formCopy);
      // set the states and go to homepage
      setLoggedIn(true);
      setMsg("Successfully registered!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setMsg(error.message);
    }
  };

  return (
    <div className="userForm">
      <form className="form" onSubmit={onSubmit}>
        <label>Name</label>
        <input onChange={handleChange} id="name" type="text" />
        <label>Email</label>
        <input onChange={handleChange} id="email" type="text" />
        <label>Password</label>
        <input onChange={handleChange} id="password" type="password" />
        <button type="submit">Sign up</button>
      </form>
      <p className="msg">{msg}</p>
      <GoogleAuth setMsg={setMsg} />
    </div>
  );
}

export default SignUp;
