import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWishlist } from "./userSlice";

function UserWishlist(id) {
  const wishlist = useSelector((state) => state.user.currentUserWishlist);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me)
  const userId = user.id;

  useEffect(() => {
    dispatch(fetchUserWishlist(userId));
  }, []);

  return (
    <div>
      <h2>Wishlist</h2>
      {wishlist?.map((restaurant, idx) => (
        <div key={idx}>
          <a href={`/restaurants/${restaurant.restaurantId}`}>
            <h3>{restaurant.restaurantName}</h3>
          </a>
        </div>
      ))}
    </div>
  );
}

export default UserWishlist;
