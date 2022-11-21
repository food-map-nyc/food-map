import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

import {Groups, Home} from "@mui/icons-material";

const Navbar = () => {
  const user = useSelector((state) => state.auth.me);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  

  return (
    <div>
      <Link to="/restaurants">
        <h1>Welcome to FoodMap</h1>
      </Link>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">
              <Home sx={{ fontSize: 40 }} />
            </Link>
            {user.isAdmin ? (
              <Link to="/users">
                <Groups sx={{ fontSize: 40 }} />
              </Link>
            ) : null}
            <Link onClick to="/suggestion">Give me a Suggestion</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
