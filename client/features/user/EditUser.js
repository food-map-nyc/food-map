import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSingleUser } from "./userSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Box,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { fetchAllRestaurant } from "../restaurant/restaurantSlice";

const EditUser = () => {
  const allRestaurants = useSelector((state) => state.restaurant.restaurants);
  const user = useSelector((state) => state.user.user);
  let cuisineFilter = [];

  const allCuisines = allRestaurants.businesses
    ?.map((restaurant) => restaurant.categories)
    .flat()
    .reduce((cuisineObject, cuisineArray) => {
      if (!(cuisineArray.title in cuisineObject)) {
        cuisineObject[cuisineArray.title] = cuisineArray.alias;
        cuisineFilter.push(cuisineArray.title);
      }
      return cuisineObject;
    }, {});

  useEffect(() => {
    dispatch(fetchAllRestaurant(1));
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [newCuisine, setcuisine] = useState("");
  const [zipcode, setZipcode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editSingleUser({
        id: user.id,
        username,
        email,
        phone,
        imageUrl,
        preferred: newCuisine,
        cuisine: allCuisines[newCuisine],
        zipcode,
      })
    );
    navigate(`/users/${user.id}`);
  };

  return (
    <Card>
      <h2> Edit your profile</h2>
      <form onSubmit={handleSubmit}>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              New Username
            </InputLabel>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              name="username"
              label="Username"
              placeholder="john"
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              New email address
            </InputLabel>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
              placeholder="john@example.com"
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              New Phone Number
            </InputLabel>
            <Input
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
              value={phone}
              placeholder="1233211234"
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              New Profile Picture
            </InputLabel>
            <Input
              onChange={(e) => setImageUrl(e.target.value)}
              name="phone"
              value={imageUrl}
              placeholder="paste url"
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              Update your zipcode
            </InputLabel>
            <Input
              onChange={(e) => setZipcode(e.target.value)}
              name="zipcode"
              value={zipcode}
              placeholder="10001"
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
            />
          </FormControl>
          <FormControl sx={{ minWidth: 250 }} variant="standard">
            <InputLabel id="demo-select-small">
              Update Cuisine Choice
            </InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={newCuisine}
              label="newCuisine"
              onChange={(e) => setcuisine(e.target.value)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cuisineFilter?.sort().map((cuisines, idx) => (
                <MenuItem value={cuisines} key={idx}>
                  {cuisines}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ color: "white" }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default EditUser;
