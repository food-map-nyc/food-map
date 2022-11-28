import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Stack, Card, Button, Grid, CardMedia } from "@mui/material";
import { emoji } from "node-emoji";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";

const FeaturedRestaurant = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const featuredRestaurants = useSelector((state) =>
    state.restaurant.featured.businesses
      ?.filter((restaurants) => restaurants.rating)
      .sort((a, b) => b.rating - a.rating)
  );

  const [restaurant, setRestaurant] = useState({
    name: "FoodMap",
    image_url:
      "https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?b=1&s=170667a&w=0&k=20&c=P3jIQq8gVqlXjd4kP2OrXYyzqEXSWCwwYtwrd81psDY=",
    review_count: 10000,
    rating: "5.0",
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
    <>
      <Card sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
        <Card sx={{ maxHeight: 700 }}>
          <CardHeader
            onClick={() => {
              navigate(`/restaurants/${restaurant.id}`);
            }}
            title={<Typography variant="h3">{restaurant.name}</Typography>}
            subheader={
              <Typography variant="h5">
                {restaurant.rating} {emoji.star} ({restaurant.review_count}{" "}
                reviews)
              </Typography>
            }
          />
          <Box
            sx={{
              width: 1200,
              height: 600,
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 600, height: 600 }}
              image={restaurant.image_url}
            />
          </Box>
        </Card>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Stack spacing={4}>
              <Typography component="div" fontSize="30px">
                Do you know someone who has trouble deciding where to eat?
              </Typography>
              <Typography component="div" fontSize="30px">
                IS IT YOU?
              </Typography>

              <Typography component="div" fontSize="30px">
                No worries, <strong>FoodMap</strong> got your back.
              </Typography>
              <Typography component="div" fontSize="30px">
                Let us do all the work and you can take all the credit for
                finding the new spot!
              </Typography>
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
            </Stack>
          </CardContent>
        </Box>
      </Card>
      <hr />
      <Typography fontSize="30px">
        RESTAURANTS WITH THE MOST REVIEWS IN ALL OF NEW YORK CITY!!!
      </Typography>
      <Grid container spacing={2}>
        {featuredRestaurants &&
          featuredRestaurants.map((restaurant, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card sx={{ maxWidth: 650, maxHeight: 200 }} className="row">
                <Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 200, height: 200 }}
                    image={restaurant.image_url}
                  />
                </Box>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Link to={`/restaurants/${restaurant.id}`}>
                    <Typography component="div" fontSize="24px">
                      <strong>{restaurant.name}</strong>
                    </Typography>
                  </Link>
                  <Typography component="div" fontSize="20px">
                    {restaurant.location.display_address[0]}
                  </Typography>

                  <Typography component="div" fontSize="20px">
                    {restaurant.location.display_address[1]}
                  </Typography>
                  <Typography component="div" fontSize="18px">
                    Cuisine:{" "}
                    {restaurant.categories
                      .map((cuisine) => cuisine.title)
                      .join(", ")}
                  </Typography>
                  {isLoggedIn && (
                    <Stack spacing={2} direction="row">
                      <a href={`/restaurants/${restaurant.id}`}>
                        <Button variant="outlined">
                          <CheckCircleOutlineIcon />
                          More Info
                        </Button>
                      </a>
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default FeaturedRestaurant;
