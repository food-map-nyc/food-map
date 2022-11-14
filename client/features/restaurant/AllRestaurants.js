import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllRestaurants } from "./restaurantSlice";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const AllRestaurants = () => {
  const restaurants = useSelector((state) => state.restaurant.restaurants);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(fetchAllRestaurants());
  }, []);

  return (
    <div>
      <div className="restaurant">
        {restaurants
          .filter((object) => !!object.dba)
          .filter((object) => !!object.cuisine_description)
          .filter((object) => object.critical_flag !== "Critical")
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

export default AllRestaurants;
