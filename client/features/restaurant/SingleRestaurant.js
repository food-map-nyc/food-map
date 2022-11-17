import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createNewUserHistory,
  fetchSingleUser,
  fetchSingleUserHistory,
} from "../user/userSlice";
import { fetchSingleRestaurant } from "./restaurantSlice";

const SingleRestaurant = () => {
  const { objectid } = useParams();
  const singleRestaurant = useSelector((state) => state.restaurant.restaurant);
  const user = useSelector((state) => state.auth.me);
  const history = useSelector((state) => state.user.currentUserHistory);
  const userId = user.id;
  const timesVisited = 0;
  const dispatch = useDispatch();
  const {
    camis,
    dba,
    building,
    street,
    boro,
    zipcode,
    phone,
    cuisine_description,
  } = singleRestaurant;

  const addToUserHistory = () => {
    dispatch(
      createNewUserHistory({
        userId: userId,
        restaurantId: camis,
        restaurantName: dba,
      })
    );
    dispatch(fetchSingleUserHistory(userId));
  };

  // const findTimesVisited = () => {
  //   for (let i = 0; i < history.length; i++) {
  //     if (history[i].restaurantId === singleRestaurant.camis)
  //       return history[i].timesVisited;
  //   }
  //   return false;
  // };

  useEffect(() => {
    dispatch(fetchSingleRestaurant(objectid));
    if (userId) {
      dispatch(fetchSingleUser(userId));
      dispatch(fetchSingleUserHistory(userId));
      for (let i = 0; i < history.length; i++) {
        if (history[i].restaurantId === singleRestaurant.camis)
          timesVisited = history[i].timesVisited;
      }
    }
  }, [userId]);
  console.log(timesVisited);

  return (
    <div>
      <img
        src={`https://toppng.com/uploads/preview/restaurant-png-11554005053riiacqdjki.png`}
      />
      <div>
        <h1>{dba}</h1>
        <p>
          Address: {building} {street}, {boro} NY {zipcode}
        </p>
        <p>Phone Number: {phone}</p>
        <p>Cuisine: {cuisine_description}</p>
        {timesVisited ? (
          <p>You have been here {timesVisited} times</p>
        ) : (
          <p>You haven't been here yet!</p>
        )}
        <button onClick={() => addToUserHistory()}>
          Add to restaurant history
        </button>
      </div>
    </div>
  );
};

export default SingleRestaurant;
