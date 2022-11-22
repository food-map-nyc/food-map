import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Pagination,
  Stack,
  Card,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import {
  fetchAllRestaurant,
  fetchByBorough,
  fetchByCuisine,
  fetchByBoroughCuisine,
} from "./restaurantSlice";

const AllRestaurant = () => {
  const allRestaurants = useSelector((state) => state.restaurant.restaurants);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [cuisine, setCuisine] = useState("");
  const [borough, setBorough] = useState("");

  let cuisineFilter = [];

  // o: make sure to write a comment explaining what this is doing when you use
  //  more complex logic like so
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
    if (borough && cuisine) {
      let alias = allCuisines[cuisine];
      dispatch(fetchByBoroughCuisine({ borough, cuisine: alias, page }));
    } else if (borough && !cuisine) {
      dispatch(fetchByBorough({ borough, page }));
    } else if (!borough && cuisine) {
      let alias = allCuisines[cuisine];
      dispatch(fetchByCuisine({ cuisine: alias, page }));
    } else {
      dispatch(fetchAllRestaurant(page));
    }
    // o: good use of dependancy array
  }, [page, cuisine, borough]);

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
            onChange={(event) => {
              setCuisine(event.target.value);
            }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {cuisineFilter?.sort().map((cuisine, idx) => (
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
            onChange={(event) => setBorough(event.target.value)}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="Brooklyn">Brooklyn</MenuItem>
            <MenuItem value="Bronx">Bronx</MenuItem>
            <MenuItem value="New York">New York</MenuItem>
            <MenuItem value="Queens">Queens</MenuItem>
            <MenuItem value="Staten Island">Staten Island</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={2}>
        {/* o: you can use allRestaurants.businesses?.map in this example */}
        {allRestaurants.businesses
          ? allRestaurants.businesses?.map((restaurant, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Card sx={{ maxWidth: 600, maxHeight: 200 }} className="row">
                  <div>
                    <img className="image" src={restaurant.image_url} />
                  </div>
                  <div>
                    <a href={`/restaurants/${restaurant.id}`}>
                      <h3>{restaurant.name}</h3>
                    </a>
                    <p>
                      {restaurant.location.display_address[0]},{" "}
                      {restaurant.location.display_address[1]}
                    </p>
                    <p>
                      Cuisine:{" "}
                      {restaurant.categories
                        .map((cuisine) => cuisine.title)
                        .join(", ")}
                    </p>
                    <div>
                      <Button variant="outlined">
                        <CheckCircleOutlineIcon />
                        Check-In
                      </Button>
                      <Button variant="outlined">
                        <StarOutlineIcon />
                        Wish List
                      </Button>
                    </div>
                  </div>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
      <Stack spacing={2}>
        <Pagination
          count={20}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Stack>
    </div>
  );
};

export default AllRestaurant;