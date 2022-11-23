import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUserHistory } from "./userSlice";

function UserFavorites() {
  const favorites = useSelector(
    (state) => state.user.currentUserHistory
  ).filter((restaurant) => restaurant.favorite === true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me)
  const userId = user.id;

  useEffect(() => {
    dispatch(fetchSingleUserHistory(userId));
  }, []);

  return (
    <div>
      <h2>Favorites</h2>
      {favorites?.map((restaurant, idx) => (
        <div key={idx}>
          <a href={`/restaurants/${restaurant.restaurantId}`}>
            <h3>{restaurant.restaurantName}</h3>
          </a>
        </div>
      ))}
    </div>
  );
}

export default UserFavorites;
