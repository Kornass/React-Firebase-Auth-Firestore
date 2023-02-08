import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import AddProduct from "./pages/AddProduct";
import Profile from "./pages/Profile";
import ForgotPass from "./pages/ForgotPass";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  // This use effect will check on every render if our user is logged in
  useEffect(() => {
    const auth = getAuth();
    // this function takes auth and a function as an argument, this function gives us back user object
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  });
  return (
    <Router>
      <Navbar loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn} />} />
        <Route
          path="/login"
          element={<LogIn setLoggedIn={setLoggedIn} setUser={setUser} />}
        />
        <Route
          path="/addproduct"
          element={loggedIn ? <AddProduct user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={loggedIn ? <Profile user={user} /> : <Navigate to="/" />}
        />
        <Route path="/forgotpass" element={<ForgotPass />} />
      </Routes>
    </Router>
  );
}

export default App;
