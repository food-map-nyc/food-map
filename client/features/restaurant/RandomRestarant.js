import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThumbDownAlt } from "@mui/icons-material";
import { Button } from "@mui/material";
import { emoji } from "node-emoji";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const RandomRestaurant = () => {
  const navigate = useNavigate();
  const featuredRestaurants = useSelector(
    (state) => state.restaurant.featured.businesses
  );

  const randomIndex = Math.floor(Math.random() * featuredRestaurants.length);
  const {
    name,
    image_url,
    location,
    display_phone,
    categories,
    price,
    rating,
    review_count,
  } = featuredRestaurants[randomIndex];

  return (
    <div>
      <h1>The next restaurant that you should try is ... </h1>
      <div className="container">
        <div className="single">
          <img src={image_url} />
        </div>
        <div>
          <h1>{name}</h1>
          <p>
            Rating: {rating}
            {emoji.star} ({review_count} reviews)
          </p>
          <p>Price: {price}</p>
          <p>
            Address: {location?.display_address[0]},{" "}
            {location?.display_address[1]}
          </p>
          <p>Phone Number: {display_phone}</p>
          <p>
            Cuisine: {categories?.map((cuisine) => cuisine.title).join(", ")}
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
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/random");
            }}
            startIcon={<ThumbDownAlt sx={{ fontSize: 40 }} />}
          >
            Don't Like What You See? Click Again!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RandomRestaurant;
