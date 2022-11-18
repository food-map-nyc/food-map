import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { getSuggestedResturant } from "./suggestionSlice";

const Suggestion = () => {
  const dispatch = useDispatch()
  const suggestions = useSelector((state)=> state.suggestion.restaurants.businesses)
  const  { email, username, imageUrl, preferred, zipcode } = useSelector((state) => state.user.user);
  const navigate = useNavigate();

 const [searchParams, setSearchParams] = useState({ term: "american", limit:5});
const [lattitude, setLattitude] = useState("");
const [longitude, setLongitude] = useState("");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setLattitude(position.coords.latitude);
      setLongitude (position.coords.longitude);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
// const Cuisines = suggestions[].categories.map((item, key) =>
// <span key={key}>{item.title}, </span>
// )
// const selectedRestaurants = allRestaurants.filter(
//   (object) =>
//     object.categories.filter((cuisine)=> cuisine.title === preferred)
// )

// const cuisine = suggestions.categories.map((item, key) =>
// <span key={key}>{item.title}, </span>
// )

useEffect(() => {
  dispatch(getSuggestedResturant());
}, []);

  return (
    <div>
      <div>
        <Typography>
          These are the places we think you would like {username} {emoji.smiley}
        </Typography>
      </div>
      <div className="container">
        <MyMap selectedRestaurants={suggestions} />
        {suggestions.map((restaurant, idx) => (
          <div key={idx}>
            <Card sx={{ maxWidth: 200 }}>
              <CardMedia
                component="img"
                height="50"
                width='50'
                image={restaurant.image_url}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {restaurant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {restaurant.location.display_address[0]},{" "}
                  {restaurant.location.display_address[1]}
                </Typography>
                <Typography>
            {restaurant.rating} out of 5 {emoji.star2}
        </Typography>
        <Typography>
            {restaurant.price} {emoji.money_with_wings}
        </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Check-In</Button>
                <Button
                  size="small"
                  onClick={() => navigate(`/restaurants/${restaurant.id}`)}
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
