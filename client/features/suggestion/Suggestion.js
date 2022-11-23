import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MyMap from "./MyMap";
import { getSuggestedResturant } from "./suggestionSlice";
import { emoji } from "node-emoji";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Star } from "@mui/icons-material";
import { Card, Button, Typography, Grid } from "@mui/material";
import {
  fetchUserWishlist,
  deleteWishlistItem,
  createNewWishlistItem,
} from "../user/userSlice";

const Suggestion = () => {
  const { cuisine, username, id } = useSelector((state) => state.auth.me);
  const suggestions = useSelector(
    (state) => state.suggestion.suggested.businesses
  );
  const wishlist = useSelector((state) => state.user.currentUserWishlist);

  const dispatch = useDispatch();

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(true);

  function error(err) {
    setLatitude(40.758896);
    setLongitude(-73.98513);
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const options = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 5000,
  };

  function success() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  const isOnWishlist = (name) => {
    for (let i = 0; i < wishlist.length; i++) {
      if (wishlist[i].restaurantName === name) {
        return true;
      }
    }
    return false;
  };

  const addToWishlist = (restaurantId, restaurantName) => {
    dispatch(
      createNewWishlistItem({
        id: restaurantId,
        userId: id,
        name: restaurantName,
      })
    );
    dispatch(fetchUserWishlist(id));
  };

  const removeFromWishlist = (restaurantId) => {
    dispatch(deleteWishlistItem({ id: restaurantId, userId: id }));
    dispatch(fetchUserWishlist(id));
  };

  useEffect(() => {
    getLocation();
    const fetchData = async () => {
      if (longitude && latitude) {
        await dispatch(getSuggestedResturant({ cuisine, longitude, latitude }));
      }
    };
    fetchData();
  }, [longitude, latitude]);

  useEffect(() => {
    if (suggestions) {
      setLoading(false);
    }
  }, [suggestions]);

  useEffect(() => {
    if (wishlist) {
      isOnWishlist();
    }
  }, [wishlist]);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserWishlist(id));
    }
  }, [id]);

  return loading ? (
    <Typography>
      <img src="https://i.ibb.co/1s9jh58/Your-paragraph-text.gif"></img>
    </Typography>
  ) : (
    <div>
      <div>
        <Typography>
          These are the places we think you would like {username} {emoji.smiley}
        </Typography>
      </div>
      <MyMap
        selectedRestaurants={suggestions}
        longitude={longitude}
        latitude={latitude}
      />
      <Grid container spacing={2}>
        {suggestions?.map((restaurant, idx) => (
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
                  <a href={`/restaurants/${restaurant.id}`}>
                    <Button variant="outlined">
                      <CheckCircleOutlineIcon />
                      Check-In
                    </Button>
                  </a>
                  {isOnWishlist(restaurant.name) ? (
                    <Button
                      variant="outlined"
                      onClick={() => removeFromWishlist(restaurant.id)}
                    >
                      <Star />
                      Remove From Wishlist
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() =>
                        addToWishlist(restaurant.id, restaurant.name)
                      }
                    >
                      <StarOutlineIcon />
                      Add to Wishlist
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Suggestion;
