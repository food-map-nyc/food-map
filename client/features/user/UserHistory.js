import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUserHistory } from "./singleUserSlice";

function UserHistory(id) {
  const history = useSelector((state) => state.singleUser.userHistory);
  const dispatch = useDispatch();
  const userId = id.id;
  console.log(history);

  useEffect(() => {
    dispatch(fetchSingleUserHistory(userId));
  }, [dispatch]);

  return (
    <div>
      {history?.map((restaurant) => (
        <div>
          <p>{restaurant.restaurantName}</p>
          <p>Times visited: {restaurant.timesVisited}</p>
        </div>
      ))}
    </div>
  );
}

export default UserHistory;
