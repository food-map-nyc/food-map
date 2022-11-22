import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Stack, Card, Button, Grid, CardMedia } from "@mui/material";
import { emoji } from "node-emoji";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const FeaturedRestaurant = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const featuredRestaurants = useSelector((state) =>
    state.restaurant.featured.businesses
      ?.filter((restaurants) => restaurants.rating)
      .sort((a, b) => b.rating - a.rating)
  );

  const [restaurant, setRestaurant] = useState({
    name: "FoodMap",
    image_url: "https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?b=1&s=170667a&w=0&k=20&c=P3jIQq8gVqlXjd4kP2OrXYyzqEXSWCwwYtwrd81psDY=",
    review_count: 10000,
    rating: "5.0"
  });
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const movingImage = () => {
    if (index < 6) {
      setRestaurant(featuredRestaurants[index]);
      setIndex(index + 1);
    } else {
      setRestaurant(featuredRestaurants[index]);
      setIndex(0);
    }
  };

  useEffect(() => {
    if (featuredRestaurants) {
      setTimeout(movingImage, 5000);
    }
  }, [featuredRestaurants]);

  return (
    <div>
      <div className="featured_box">
        <Link to={`/restaurants/${restaurant.id}`}>
          <Card sx={{ width: 600, height: 600 }}>
            <h1>{restaurant.name} </h1>
            <h2>
              {restaurant.rating} {emoji.star} ({restaurant.review_count} reviews)
            </h2>
            <CardMedia
              component="img"
              height="600"
              image={restaurant.image_url}
              alt="Dish"
            />
          </Card>
        </Link>
        <div className="text_box">
          <h2>Do you know someone who has trouble deciding where to eat?</h2>
          <h1>IS IT YOU?</h1>
          <h1>
            No worries, <strong>FoodMap</strong> has got your back.
          </h1>
          <h2>
            Let us do all the work and you can take all the credit for finding the new spot!
          </h2>
          {isLoggedIn ? (
            <Stack spacing={2} direction="row">
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/suggestion");
                }}
              >
                Suggestions For You
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/random");
                }}
              >
                Feeling Risky? Click Here
              </Button>
            </Stack>
          ) : (
            <Stack spacing={2} direction="row">
              <Link to="signup">
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign Up for Suggestions
                </Button>
              </Link>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/random");
                }}
              >
                Feeling Risky? Click Here
              </Button>
            </Stack>
          )}
        </div>
      </div>
      <hr />
      <h2>RESTAURANTS WITH THE MOST REVIEWS IN ALL OF NEW YORK CITY!!!</h2>
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
    </div>
  );
};

export default FeaturedRestaurant;
