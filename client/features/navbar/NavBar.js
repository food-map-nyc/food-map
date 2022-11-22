import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

import { Button, Typography, AppBar, Box, Toolbar, IconButton, Menu, Container, Avatar, Tooltip, MenuItem } from "@mui/material";

import LunchDiningIcon from "@mui/icons-material/LunchDining";

const Navbar = () => {
  const user = useSelector((state) => state.auth.me);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    const logoutAndRedirectHome = () => {
    setAnchorEl(null)
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LunchDiningIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: 40, color: "blue" }}
          />
          <Typography
            variant="h3"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "blue",
              textDecoration: "none",
            }}
            onClick={()=>{navigate("/")}}
          >
            FOODMAP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
              <Button
                key="Home"
                sx={{ my: 2, display: "block", fontSize: 25, color: "blue" }}
                onClick={()=>{navigate("/home")}}
              >
                Home
              </Button>
              <Button
              key="Restaurants"
              sx={{ my: 2, display: "block", fontSize: 25, color: "blue" }}
              onClick={()=>{navigate("/restaurants")}}
            >
              RESTAURANTS
            </Button>
            {isLoggedIn && 
            <Button
            key="Profile"
            sx={{ my: 2, display: "block", fontSize: 25, color: "blue" }}
            onClick={()=>{navigate("/profile")
            }}
          >
            PROFILE
          </Button> }
          {!isLoggedIn && 
          <>
            <Button
            key="Login"
            sx={{ my: 2, display: "block", fontSize: 25, color: "blue" }}
            onClick={()=>{navigate("/login")
            }}
          >
            LOGIN
          </Button>
          <Button
          key="Signup"
          sx={{ my: 2, color: "blue", display: "block", fontSize: 25 }}
          onClick={()=>{navigate("/signup")
          }}
        >
          SIGNUP
        </Button> </>}
          {user.isAdmin && 
            <Button
            key="Users"
            sx={{ my: 2, color: "blue", display: "block", fontSize: 25 }}
            onClick={()=>{navigate("/users")
            }}
          >
            USERS
          </Button> }
          </Box>
          {isLoggedIn &&
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleClick} sx={{ p: 0 }}>
                <Avatar src={user.imageUrl} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem key="History">
                <Typography textAlign="center">HISTORY</Typography>
              </MenuItem>
              <MenuItem key="Favorites">
                <Typography textAlign="center">FAVORITES</Typography>
              </MenuItem>
              <MenuItem key="Wishlist">
                <Typography textAlign="center">WISHLIST</Typography>
              </MenuItem>
              <MenuItem key="Logout">
                <Typography textAlign="center" onClick={logoutAndRedirectHome}>LOGOUT</Typography>
              </MenuItem>
            </Menu>
          </Box> }
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
