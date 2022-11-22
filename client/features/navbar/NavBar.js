import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

import {
  Groups,
  Home,
  Restaurant,
  Person,
  Star,
  Favorite,
  Logout,
  Login,
  AppRegistration
} from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

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
      <Link to="/">
        <h1>Welcome to FoodMap</h1>
      </Link>
      <nav>
       
       {/* o: it may make sense to create two components for the logged in and logged out navbar */}
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
             <Stack spacing={2} direction = "row">
              <Button
                variant="outlined"
                onClick={()=>{navigate("/home")}}
                startIcon={<Home sx={{ fontSize: 40 }} />}
              >
                HOME
              </Button>
              <Button
                variant="outlined"
                onClick={()=>{navigate("/profile")}}
                startIcon={<Person sx={{ fontSize: 40 }} />}
              >
                USER PROFILE
              </Button>
              <Button
                variant="outlined"
                onClick={()=>{navigate("/restaurants")}}
                startIcon={<Restaurant sx={{ fontSize: 40 }} />}
              >
                RESTAURANTS
              </Button>
            <Button
              variant="outlined"
              startIcon={<Favorite sx={{ fontSize: 40 }} />}
            >
              FAVORITES
            </Button>
            <Button
              variant="outlined"
              startIcon={<Star sx={{ fontSize: 40 }} />}
            >
              WISHLIST
            </Button>
            {/* o: you can use user.isAdmin && ... in these circumstances */}
            {user.isAdmin ? (
              <Button
              variant="outlined"
              onClick={()=>{navigate("/users")}}
              startIcon={<Groups sx={{ fontSize: 40 }} />}
            >
              ALL USERS
            </Button>
            ) : null}
            <Button
              variant="outlined"
              onClick={logoutAndRedirectHome}
              startIcon={<Logout sx={{ fontSize: 40 }} />}
            >
              LOGOUT
            </Button>
             </Stack>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Stack spacing={2} direction = "row">
            <Button
              variant="outlined"
              onClick={()=>{navigate("/login")}}
              startIcon={<Login sx={{ fontSize: 40 }} />}
            >
              LOGIN
            </Button>
            <Button
              variant="outlined"
              onClick={()=>{navigate("/signup")}}
              startIcon={<AppRegistration sx={{ fontSize: 40 }} />}
            >
              SIGN IN
            </Button>
            </Stack>
          </div>
        )}
       
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
