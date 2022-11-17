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
  const dispatch = useDispatch();
  console.log(history);
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

  // const addToUserHistory = () => {
  //   // if ()
  //   dispatch(createNewUserHistory({ userId, camis, dba }));
  // };
  useEffect(() => {
    dispatch(fetchSingleRestaurant(objectid));
    dispatch(fetchSingleUser(userId));
    dispatch(fetchSingleUserHistory(userId));
  }, []);

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
        <button onClick={() => addToUserHistory()}>
          Add to restaurant history
        </button>
      </div>
    </div>
  );
};

export default SingleRestaurant;
