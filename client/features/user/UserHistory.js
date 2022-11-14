import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleUserHistory } from "./singleUserSlice";
import { fetchSingleRestaurant } from "../restaurant/restaurantSlice";
import UserHistoryRestaurant from "./UserHistoryRestaurant";
import { TimesOneMobiledata } from "@mui/icons-material";

function UserHistory(id) {
  //   const user = useSelector((state) => state.singleUser.user);
  const history = useSelector((state) => state.singleUser.userHistory);
  const singleRestaurant = useSelector((state) => state.restaurant.restaurant);
  const visitedRestaurants = history.restaurants;
  const dispatch = useDispatch();
  const userId = id.id;
  const visitedRestaurantInfo = [];
  console.log(visitedRestaurants);

  const restaurantInfo = () => {
    visitedRestaurants?.forEach((restaurant) => {
      dispatch(fetchSingleRestaurant(restaurant.restaurantId));
      visitedRestaurantInfo.push(singleRestaurant);
    });
  };

  useEffect(() => {
    dispatch(fetchSingleUserHistory(userId));
    restaurantInfo();
  }, [dispatch]);

  console.log(visitedRestaurantInfo);

  return (
    <div>
      {visitedRestaurantInfo?.map((restaurant, idx) => (
        <div>
          <p>{restaurant.dba}</p>
          <p>Times visited: {visitedRestaurants[idx].timesVisited}</p>
        </div>
      ))}
    </div>
  );
}

export default UserHistory;
