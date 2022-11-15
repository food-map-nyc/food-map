import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { emoji } from "node-emoji";
import MyMap from "./MyMap";

const Suggestion = () => {
  const navigate = useNavigate();

  const { preferred, username } = useSelector((state) => state.user.user);
  const allRestaurants = useSelector((state) => state.restaurant.restaurants);

  const selectedRestaurants = allRestaurants.filter(
    (object) =>
      !!object.dba &&
      !!object.cuisine_description &&
      object.cuisine_description.toLowerCase() === preferred.toLowerCase() &&
      object.critical_flag !== "Critical"
  );

  return (
    <div>
      <div>
        <Typography>
          These are the places we think you would like {username} {emoji.smiley}
        </Typography>
      </div>
      <div className="container">
        <MyMap selectedRestaurants={selectedRestaurants} />
        {selectedRestaurants.map((restaurant, idx) => (
          <div key={idx}>
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
    </div>
  );
};

export default Suggestion;
