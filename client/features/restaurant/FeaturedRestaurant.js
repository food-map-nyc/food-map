import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeatured } from "./restaurantSlice";
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
  CardMedia,
  CardHeader,
  CardContent,
  Rating,
} from "@mui/material";
import { emoji } from "node-emoji";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Link } from "react-router-dom";

const FeaturedRestaurant = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const featuredRestaurants = useSelector((state) =>
    state.restaurant.featured.businesses
      ?.filter((restaurants) => restaurants.rating)
      .sort((a, b) => b.rating - a.rating)
  );
  //   const filteredRestaurants = featuredRestaurants

  //   const featuredImage = filteredRestaurants
  //     ? filteredRestaurants[0]?.image_url
  //     : null;

  const [image, setImage] = useState("");
  const [index, setIndex] = useState(0);
  // console.log(featuredRestaurants)

  const movingImage = () => {
    if (index < 6) {
      setImage(featuredRestaurants[index]);
      setIndex(index + 1);
    } else {
      setImage(featuredRestaurants[index]);
      setIndex(0);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeatured());
  }, []);

  useEffect(() => {
    if (featuredRestaurants) {
      setTimeout(movingImage, 5000);
    }
  }, [featuredRestaurants]);

  return (
    <div>
      <div className="featured_box">
        <Link to={`/restaurants/${image.id}`}>
          <Card sx={{ width: 600, height: 600 }}>
            <h1>{image?.name} </h1>
            <h2>
              {image?.rating} {emoji.star} ({image?.review_count} reviews)
            </h2>
            <CardMedia
              component="img"
              height="600"
              image={image?.image_url}
              alt="Dish"
            />
          </Card>
        </Link>
        <div className="text_box">
          <h2>Do you know someone who has trouble deciding where to eat?</h2>
          <h1>Is it you?</h1>
          <h1>No worries, FoodMap got your back.</h1>
          <h2>
            Let us do all the work and you can take all the credit for finding
            the new spot!
          </h2>
          {isLoggedIn ? (
            <Stack spacing={2} direction="row">
              <Link to="/suggestions">
                <Button variant="outlined">Suggestions For You</Button>
              </Link>
              <Button variant="outlined">Feeling Risky? Click Here</Button>
            </Stack>
          ) : (
            <Stack spacing={2} direction="row">
              <Link to="signup">
                <Button variant="outlined">Sign Up for Suggestions</Button>
              </Link>
              <Button variant="outlined">Feeling Risky? Click Here</Button>
            </Stack>
          )}
        </div>
      </div>
      <hr />
      <Grid container spacing={2}>
        {featuredRestaurants
          ? featuredRestaurants.map((restaurant, idx) => (
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
                      <Button size="small">
                        <CheckCircleOutlineIcon />
                        Check-In
                      </Button>
                      <Button size="small">
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
    </div>
  );
};

export default FeaturedRestaurant;
