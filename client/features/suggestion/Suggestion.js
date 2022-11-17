import React, { useState } from "react";
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
  const suggestions = useSelector((state)=> state.suggestions.suggested)
  const  { email, username, imageUrl, preferred, zipcode } = useSelector((state) => state.user.user);
  const navigate = useNavigate();

 const [searchParams, setSearchParams] = useState({ term, location });

const Cuisines = suggestions.categories.map((item, key) =>
<span key={key}>{item.title}, </span>
)

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
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="70"
                image=""
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {restaurant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {restaurant.address1} {restaurant.address2},{" "}
                  {restaurant.boro}, NY {restaurant.zipcode}
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
