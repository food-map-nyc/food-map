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
  Box,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import {
  fetchAllRestaurant,
  fetchByBorough,
  fetchByCuisine,
  fetchByBoroughCuisine,
} from "./restaurantSlice";
import { fetchSingleUserHistory } from "../user/userSlice";

const AllRestaurant = () => {
  const allRestaurants = useSelector((state) => state.restaurant.restaurants);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [cuisine, setCuisine] = useState("");
  const [borough, setBorough] = useState("");

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
  }, [page, cuisine, borough]);

  return (
    <div>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
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
          <Stack spacing={2}>
            <Pagination
              count={20}
              page={page}
              onChange={(event, value) => setPage(value)}
            />
          </Stack>
          <hr />
        </Box>
      </div>
      <Grid container spacing={2} mt={3}>
        {allRestaurants.businesses
          ? allRestaurants.businesses.map((restaurant, idx) => (
              <Grid
                item
                xs={12}
                md={6}
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card sx={{ width: 600, height: 200 }} className="row">
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
                    {isLoggedIn && (
                      <div>
                        <a href={`/restaurants/${restaurant.id}`}>
                          <Button variant="outlined">
                            <CheckCircleOutlineIcon />
                            Check-In
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    </div>
  );
};

export default AllRestaurant;
