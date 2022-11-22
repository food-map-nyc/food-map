import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleUserHistory,
  editSingleUserHistory,
  addOrRemoveFromFavorites,
  createNewUserHistory,
} from "../user/userSlice";
import { fetchSingleRestaurant } from "./restaurantSlice";
import { Rating, Grid, Card } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Button } from "@mui/material";
import { fetchReviews } from "./restaurantSlice";

const SingleRestaurant = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const { objectid } = useParams();
  const singleRestaurant = useSelector((state) => state.restaurant.restaurant);
  const { reviews } = useSelector((state) => state.restaurant.reviews);
  
  const {
    name,
    image_url,
    location,
    display_phone,
    categories,
    price,
    rating,
    review_count,
    photos,
  } = singleRestaurant;
  const user = useSelector((state) => state.auth.me);
  const history = useSelector((state) => state.user.currentUserHistory);
  const userId = user.id;
  const dispatch = useDispatch();

  // history[i].timesVisited is read only, so it can't be reassigned to a variable???
  const findTimesVisited = () => {
    for (let i = 0; i < history.length; i++) {
      if (history[i].restaurantName === name) {
        return history[i].timesVisited;
      }
    }
  };

  const isFavorite = () => {
    for (let i = 0; i < history.length; i++) {
      if (history[i].restaurantName === name) {
        return history[i].favorite;
      }
    }
  };

  const incrementHistory = () => {
    dispatch(editSingleUserHistory({ id: objectid, userId: userId }));
    dispatch(fetchSingleUserHistory(userId));
  };

  const addToHistory = () => {
    dispatch(
      createNewUserHistory({ id: objectid, userId: userId, name: name })
    );
    dispatch(fetchSingleUserHistory(userId));
  };

  const toggleFavorite = () => {
    dispatch(addOrRemoveFromFavorites({ id: objectid, userId: userId }));
    dispatch(fetchSingleUserHistory(userId));
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchSingleRestaurant(objectid));
      dispatch(fetchSingleUserHistory(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (history) {
      findTimesVisited();
      isFavorite();
    }
  }, [history]);

  return (
    <div>
      <div className="container">
        <div className="single">
          <img src={image_url} />
        </div>
        <div>
          <h1>{name}</h1>
          <p>
            Rating:{" "}
            {rating ? (
              <Rating
                name="half-rating"
                defaultValue={rating}
                precision={0.5}
              />
            ) : null}{" "}
            ({review_count} reviews)
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
          {isLoggedIn &&
          <div>
            <Button variant="outlined">
              <CheckCircleOutlineIcon />
              Check-In
            </Button>
            <Button variant="outlined">
              <StarOutlineIcon />
              Wish List
            </Button>
          </div> }
        </div>
      </div>
      <div>
        <h2>Reviews</h2>
        <Grid container spacing={2}>
          {reviews
            ? reviews.map((review, idx) => (
                <Grid item xs={12} md={6} key={idx}>
                  <Card sx={{ maxWidth: 600, maxHeight: 200 }} className="row">
                    <div>
                      {photos ? <img className="image" src={photos[idx]} /> : null}
                    </div>
                    <div>
                      <h3>{review.user.name}</h3>
                      <p>
                        Rating:{" "}
                        {review.rating ? (
                          <Rating
                            name="half-rating"
                            defaultValue={review.rating}
                            precision={0.5}
                          />
                        ) : null}
                      </p>
                      <p>
                        {review.text}
                      </p>
                    </div>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
      </div>
    </div>
  );
};

export default SingleRestaurant;
