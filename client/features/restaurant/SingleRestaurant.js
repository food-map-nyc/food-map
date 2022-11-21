import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleUserHistory,
  editSingleUserHistory,
} from "../user/userSlice";
import { fetchSingleRestaurant } from "./restaurantSlice";
import { Rating } from "@mui/material";

const SingleRestaurant = () => {
  const { objectid } = useParams();
  const singleRestaurant = useSelector((state) => state.restaurant.restaurant);
  const user = useSelector((state) => state.auth.me);
  const history = useSelector((state) => state.user.currentUserHistory);
  const userId = user.id;
  const dispatch = useDispatch();

  const {
    name,
    image_url,
    location,
    display_phone,
    categories,
    price,
    rating,
    review_count,
  } = singleRestaurant;

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

  const addToHistory = () => {
    dispatch(editSingleUserHistory({ id: objectid, userId: userId }));
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
    }
  }, [history]);

  return (
    <div className="container">
      <div>
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
        {userId ? (
          <div>
            <p>You have been here {findTimesVisited()} times</p>
            <p>Favorite? {isFavorite() ? "Yes" : "No"}</p>
            <button onClick={addToHistory}>Add to Restaurant History</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SingleRestaurant;
