import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWishlist, deleteWishlistItem } from "./userSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button } from "@mui/material";
import { Star } from "@mui/icons-material";

function UserWishlist(id) {
  const wishlist = useSelector((state) => state.user.currentUserWishlist);
  const dispatch = useDispatch();
  const userId = id.id;

  const removeFromWishlist = (id) => {
    dispatch(deleteWishlistItem({ id: id, userId: userId }));
    dispatch(fetchUserWishlist(userId));
  };

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
          <a href={`/restaurants/${restaurant.restaurantId}`}>
            <Button variant="outlined">
              <CheckCircleOutlineIcon />
              Check-In
            </Button>
          </a>
          <Button
            variant="outlined"
            onClick={() => removeFromWishlist(restaurant.restaurantId)}
          >
            <Star />
            Remove From Wishlist
          </Button>
        </div>
      ))}
    </div>
  );
}

export default UserWishlist;
