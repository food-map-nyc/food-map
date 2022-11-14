import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleRestaurant } from "../restaurant/restaurantSlice";
fetchSingleRestaurant;

export default function UserHistoryRestaurant(props) {
  const singleRestaurant = useSelector((state) => state.restaurant.restaurant);
  console.log(singleRestaurant);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleRestaurant(props.restaurant.restaurantId));
  }, []);
  return (
    <div>
      <p>{singleRestaurant.dba}</p>
      <p>Times visited: {props.restaurant.timesVisited}</p>
    </div>
  );
}
