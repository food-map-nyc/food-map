import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllRestaurant } from "./restaurantSlice";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AllRestaurant = () => {
  const allRestaurants = useSelector((state) => state.restaurant.restaurants);
  let selectedRestaurants = allRestaurants
    .filter((object) => !!object.dba) // restaurant has a name
    .filter((object) => !!object.cuisine_description) // restaurant has a cuisine
    .filter((object) => object.critical_flag !== "Critical"); // restaurant does not have bad health grade
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [cuisine, setCuisine] = useState("");
  const [borough, setBorough] = useState("");

  const allCuisines = allRestaurants.map(restaurant => restaurant.cuisine_description).reduce((cuisineArray, currentCuisine) => {
    if(currentCuisine && !cuisineArray.includes(currentCuisine)){
      cuisineArray.push(currentCuisine)
      }
    return cuisineArray
  }, []).sort()

  const handleCuisine = (event) => {
    setCuisine(event.target.value);
  };

  const handleBorough = (event) => {
    setBorough(event.target.value);
  };

  selectedRestaurants = selectedRestaurants.filter((restaurant) => {
    if (cuisine) {
      return restaurant.cuisine_description === cuisine
    } else {
      return restaurant
    }
  });

  selectedRestaurants = selectedRestaurants.filter((restaurant) => {
    if (borough) {
      return restaurant.boro === borough
    } else {
      return restaurant
    }
  });

  useEffect(() => {
    dispatch(fetchAllRestaurant());
  }, []);

  return (
    <div>
      <div>
       <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Cuisine</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={cuisine}
          label="Cuisine"
          onChange={handleCuisine}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {allCuisines?.map((cuisine, idx) => 
            <MenuItem value={cuisine} key={idx}>{cuisine}</MenuItem>
          )}
        </Select>
      </FormControl>
       <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Borough</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={borough}
          label="Borough"
          onChange={handleBorough}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
            <MenuItem value="Brooklyn">Brooklyn</MenuItem>
            <MenuItem value="Bronx">Bronx</MenuItem>
            <MenuItem value="Manhattan">Manhattan</MenuItem>
            <MenuItem value="Queens">Queens</MenuItem>
            <MenuItem value="Staten Island">Staten Island</MenuItem>
        </Select>
      </FormControl>
      </div>
      <div className="container">
        {selectedRestaurants
          .slice((page - 1) * 18, page * 18)
          .map((restaurant, idx) => (
            <div key={idx} className="row">
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="70"
                  image="https://toppng.com/uploads/preview/restaurant-png-11554005053riiacqdjki.png"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {restaurant.dba}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Address: {restaurant.building} {restaurant.street},{" "}
                    {restaurant.boro}, NY {restaurant.zipcode}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Check-In</Button>
                  <Button
                    size="small"
                    onClick={() => navigate(`/restaurants/${restaurant.camis}`)}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
      </div>
      <Stack spacing={2}>
        <Pagination count={9} page={page} onChange={handleChange} />
      </Stack>
    </div>
  );
};

export default AllRestaurant;
