import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrRemoveFromFavorites,
  editSingleUserHistory,
  fetchSingleUserHistory,
} from "./userSlice";

function UserHistory(id) {
  const history = useSelector((state) => state.user.currentUserHistory);
  const dispatch = useDispatch();
  const userId = id.id;

  const editHistory = (id) => {
    dispatch(editSingleUserHistory({ id, userId }));
    dispatch(fetchSingleUserHistory(userId));
  };

  const toggleFavorite = (id) => {
    dispatch(addOrRemoveFromFavorites({ id, userId: userId }));
    dispatch(fetchSingleUserHistory(userId));
  };

  useEffect(() => {
    dispatch(fetchSingleUserHistory(userId));
  }, []);

  return (
    <div>
      {history?.map((restaurant, idx) => (
        <div key={idx}>
          <a href={`/restaurants/${restaurant.restaurantId}`}>
            <h3>{restaurant.restaurantName}</h3>
          </a>
          <p>Times visited: {restaurant.timesVisited}</p>
          <p>Favorite? {restaurant.favorite ? "Yes" : "No"}</p>
          <button onClick={() => toggleFavorite(restaurant.restaurantId)}>
            Toggle Favorite
          </button>
          <button onClick={() => editHistory(restaurant.restaurantId)}>
            +
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserHistory;
