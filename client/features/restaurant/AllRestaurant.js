import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  Stack,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const AllRestaurant = () => {
  const allRestaurants = useSelector((state) => state.restaurant.restaurants);
  let selectedRestaurants = allRestaurants.filter(
    (object) =>
      !!object.dba &&
      !!object.cuisine_description &&
      object.critical_flag !== "Critical"
  );

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [cuisine, setCuisine] = useState("");
  const [borough, setBorough] = useState("");

  const allCuisines = allRestaurants
    .map((restaurant) => restaurant.cuisine_description)
    .reduce((cuisineArray, currentCuisine) => {
      if (currentCuisine && !cuisineArray.includes(currentCuisine)) {
        cuisineArray.push(currentCuisine);
      }
      return cuisineArray;
    }, [])
    .sort();

  const handleCuisine = (event) => {
    setCuisine(event.target.value);
  };

  const handleBorough = (event) => {
    setBorough(event.target.value);
  };

  if (cuisine) {
    selectedRestaurants = selectedRestaurants.filter(
      (restaurant) => restaurant.cuisine_description === cuisine
    );
  }

  if (borough) {
    selectedRestaurants = selectedRestaurants.filter(
      (restaurant) => restaurant.boro === borough
    );
  }

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
            {allCuisines?.map((cuisine, idx) => (
              <MenuItem value={cuisine} key={idx}>
                {cuisine}
              </MenuItem>
            ))}
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
