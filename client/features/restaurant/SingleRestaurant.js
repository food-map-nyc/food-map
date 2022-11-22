import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleUserHistory,
  editSingleUserHistory,
  addOrRemoveFromFavorites,
  createNewUserHistory,
  createNewWishlistItem,
  fetchUserWishlist,
  deleteWishlistItem,
} from "../user/userSlice";
import { fetchSingleRestaurant } from "./restaurantSlice";
import { Rating } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Button } from "@mui/material";

const SingleRestaurant = () => {
  const { objectid } = useParams();
  const {
    name,
    image_url,
    location,
    display_phone,
    categories,
    price,
    rating,
    review_count,
  } = useSelector((state) => state.restaurant.restaurant);
  const user = useSelector((state) => state.auth.me);
  const history = useSelector((state) => state.user.currentUserHistory);
  const wishlist = useSelector((state) => state.user.currentUserWishlist);
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

  const isOnWishlist = () => {
    for (let i = 0; i < wishlist.length; i++) {
      if (wishlist[i].restaurantName === name) {
        return true;
      }
    }
    return false;
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

  const addToWishlist = () => {
    dispatch(
      createNewWishlistItem({ id: objectid, userId: userId, name: name })
    );
    dispatch(fetchUserWishlist(userId));
  };

  const removeFromWishlist = () => {
    dispatch(deleteWishlistItem({ id: objectid, userId: userId }));
    dispatch(fetchUserWishlist(userId));
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchSingleRestaurant(objectid));
      dispatch(fetchSingleUserHistory(userId));
      dispatch(fetchUserWishlist(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (history) {
      findTimesVisited();
      isFavorite();
      isOnWishlist();
    }
  }, [history]);

  return (
    <div className="container">
      <div className="single">
        <img src={image_url} />
      </div>
      <div>
        <h1>{name}</h1>
        <p>
          Rating:{" "}
          {rating ? (
            <Rating name="half-rating" defaultValue={rating} precision={0.5} />
          ) : null}{" "}
          ({review_count} reviews)
        </p>
        <p>Price: {price}</p>
        <p>
          Address: {location?.display_address[0]},{" "}
          {location?.display_address[1]}
        </p>
        <p>Phone Number: {display_phone}</p>
        <p>Cuisine: {categories?.map((cuisine) => cuisine.title).join(", ")}</p>
        <div>
          <Button variant="outlined">
            <CheckCircleOutlineIcon />
            Check-In
          </Button>
          {isOnWishlist() ? (
            <Button variant="outlined" onClick={removeFromWishlist}>
              <StarOutlineIcon />
              Remove From Wishlist
            </Button>
          ) : (
            <Button variant="outlined" onClick={addToWishlist}>
              <StarOutlineIcon />
              Wish List
            </Button>
          )}
        </div>
        <p>Phone Number: {display_phone}</p>
        <p>Cuisine: {categories?.map((cuisine) => cuisine.title).join(", ")}</p>
        {userId ? (
          <div>
            <p>You have been here {findTimesVisited()} times</p>
            <p>Favorite? {isFavorite() ? "Yes" : "No"}</p>
            <button onClick={toggleFavorite}>Toggle favorite</button>
            {findTimesVisited() ? (
              <button onClick={incrementHistory}>
                Add to Restaurant History
              </button>
            ) : (
              <button onClick={addToHistory}>Add to Restaurant History</button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SingleRestaurant;
