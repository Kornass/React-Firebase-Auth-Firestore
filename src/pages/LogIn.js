import { useState } from "react";
import { useNavigate } from "react-router-dom";
// LogIn imports from firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import GoogleAuth from "../components/GoogleAuth";

function LogIn({ setLoggedIn, setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const { email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      // email or password id here:
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // initializing auth
      const auth = getAuth();
      // sign in with email and password promise
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // if user exist (true) then set a states and navigate to homepage
      console.log(userCredential.user);
      if (userCredential.user) {
        setUser(userCredential.user.uid); // we set a uid of a user to state
        setLoggedIn(true); // change a loggedIn state
        setMsg("Successfully logged in !"); // Displaying a message
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
    } catch (error) {
      setMsg(error.message);
    }
  };
  return (
    <div className="userForm">
      <form className="form" onSubmit={onSubmit}>
        <label>Email</label>
        <input onChange={handleChange} id="email" type="email" />
        <label>Password</label>
        <input onChange={handleChange} id="password" type="password" />
        <button type="submit">Log in</button>
      </form>
      <button className="forgotbtn" onClick={() => navigate("/forgotpass")}>
        Forgot a Password!
      </button>
      <p className="msg">{msg}</p>

      <GoogleAuth setUser={setUser} setMsg={setMsg} />
    </div>
  );
}

export default LogIn;
