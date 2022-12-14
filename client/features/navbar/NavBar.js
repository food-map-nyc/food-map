import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../app/store";

import {
  Button,
  Typography,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

const Navbar = () => {
  const user = useSelector((state) => state.auth.me);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutAndRedirectHome = () => {
    setAnchorEl(null);
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography>
            <Link to="/">
              <img
                src="https://i.ibb.co/SrGW7L6/FOODMAP-LOGO.gif"
                alt="FoodMap"
                width="250px"
                height="220px"
                className="logo"
              ></img>
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            <>
              <Button
                variant="outlined"
                key="Restaurants"
                sx={{
                  my: 2,
                  display: "block",
                  fontSize: 30,
                  color: "#ff7038",
                  borderColor: "#ff7038",
                  borderWidth: "3px",
                  m: 1,
                }}
                onClick={() => {
                  navigate("/restaurants");
                }}
              >
                RESTAURANTS
              </Button>
              {isLoggedIn && (
                <>
                  <Button
                    variant="outlined"
                    key="suggestion"
                    sx={{
                      my: 2,
                      display: "block",
                      fontSize: 30,
                      color: "gold",
                      borderColor: "gold",
                      borderWidth: "3px",
                      m: 1,
                      ml: 4,
                    }}
                    onClick={() => {
                      navigate("/suggestion");
                    }}
                  >
                    Show Me Suggestions!
                  </Button>
                  <Button
                    variant="outlined"
                    key="Profile"
                    sx={{
                      my: 2,
                      display: "block",
                      fontSize: 30,
                      color: "#ff7038",
                      borderColor: "#ff7038",
                      borderWidth: "3px",
                      m: 1,
                    }}
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    PROFILE
                  </Button>
                </>
              )}{" "}
            </>
            {!isLoggedIn && (
              <>
                <Button
                  variant="outlined"
                  key="Login"
                  sx={{
                    my: 2,
                    display: "block",
                    fontSize: 30,
                    color: "#ff7038",
                    borderColor: "#ff7038",
                    borderWidth: "3px",
                    m: 1,
                  }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  LOGIN
                </Button>
                <Button
                  variant="outlined"
                  key="Signup"
                  sx={{
                    my: 2,
                    display: "block",
                    fontSize: 30,
                    color: "#ff7038",
                    borderColor: "#ff7038",
                    borderWidth: "3px",
                    m: 1,
                  }}
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  SIGNUP
                </Button>{" "}
              </>
            )}
            {user.isAdmin && (
              <Button
                variant="outlined"
                key="Users"
                sx={{
                  my: 2,
                  display: "block",
                  fontSize: 30,
                  color: "#ff7038",
                  borderColor: "#e62727",
                  borderWidth: "3px",
                  m: 1,
                }}
                onClick={() => {
                  navigate("/users");
                }}
              >
                USERS
              </Button>
            )}
          </Box>
          {isLoggedIn && (
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
                  <Typography
                    textAlign="center"
                    onClick={() => {
                      navigate("/history");
                      setAnchorEl(null);
                    }}
                  >
                    HISTORY
                  </Typography>
                </MenuItem>
                <MenuItem key="Favorites">
                  <Typography
                    textAlign="center"
                    onClick={() => {
                      navigate("/favorites");
                      setAnchorEl(null);
                    }}
                  >
                    FAVORITES
                  </Typography>
                </MenuItem>
                <MenuItem key="Wishlist">
                  <Typography
                    textAlign="center"
                    onClick={() => {
                      navigate("/wishlist");
                      setAnchorEl(null);
                    }}
                  >
                    WISHLIST
                  </Typography>
                </MenuItem>
                <MenuItem key="Logout">
                  <Typography
                    textAlign="center"
                    onClick={logoutAndRedirectHome}
                  >
                    LOGOUT
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
