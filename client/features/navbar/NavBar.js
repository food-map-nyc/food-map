import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LogoutIcon from '@mui/icons-material/Logout';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const Navbar = () => {
  const user = useSelector((state) => state.auth.me);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Link to="/">
        <h1>Welcome to FoodMap</h1>
      </Link>
      <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon position tabs example"
    >
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">
              <Tab icon={<HomeIcon sx={{ fontSize: 40 }}/>} label="HOME"/>
            </Link>
            <Link to="/restaurants">
              <Tab icon={<RestaurantIcon sx={{ fontSize: 40 }}/>} label="RESTAURANTS"/> 
              </Link>
            {user.isAdmin ? (
              <Link to="/users">
                <Tab icon={<GroupsIcon sx={{ fontSize: 40 }}/>} label="ALL USERS" />
              </Link>
            ) : null}
              <Tab icon={<LogoutIcon sx={{ fontSize: 40 }}/>} label="LOGOUT" onClick={logoutAndRedirectHome}/> 
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">
              <Tab icon={<LoginIcon sx={{ fontSize: 40 }}/>} label="LOGIN"/>
            </Link>
            <Link to="/signup">
              <Tab icon={<AppRegistrationIcon sx={{ fontSize: 40 }}/>} label="SIGN UP"/>
            </Link>
          </div>
        )}
        </Tabs>
      <hr />
    </div>
  );
};

export default Navbar;
