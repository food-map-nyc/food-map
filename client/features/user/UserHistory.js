import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSingleUserHistory, fetchSingleUserHistory } from "./userSlice";

function UserHistory(id) {
  const history = useSelector((state) => state.user.currentUserHistory);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userId = id.id;
  console.log(history);

  const editHistory = (id) => {
    dispatch(editSingleUserHistory({ id, userId }));
    dispatch(fetchSingleUserHistory(userId));
  };

  useEffect(() => {
    dispatch(fetchSingleUserHistory(userId));
  }, []);

  return (
    <div>
      {history?.map((restaurant, idx) => (
        <div key={idx}>
          <p>{restaurant.restaurantName}</p>
          <p>Times visited: {restaurant.timesVisited}</p>
          <p onClick={() => editHistory(restaurant.id)}>+</p>
        </div>
      ))}
    </div>
  );
}

export default UserHistory;
