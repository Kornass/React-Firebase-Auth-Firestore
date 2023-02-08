import React from "react";
import { NavLink } from "react-router-dom";
function Navbar({ loggedIn }) {
  return (
    <div className="nav">
      <NavLink to="/">Home</NavLink>
      {!loggedIn && <NavLink to="/login">LogIn</NavLink>}
      {!loggedIn && <NavLink to="/signup">SignUp</NavLink>}
      <NavLink to="/addproduct">AddProduct</NavLink>
      {loggedIn && <NavLink to="/profile">Profile</NavLink>}
    </div>
  );
}

export default Navbar;
