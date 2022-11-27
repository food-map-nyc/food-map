import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWishlist, deleteWishlistItem } from "./userSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button, Grid, Card, Box } from "@mui/material";
import { Star } from "@mui/icons-material";

function UserWishlist(id) {
  const wishlist = useSelector((state) => state.user.currentUserWishlist);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);
  const userId = user.id;

  const removeFromWishlist = (id) => {
    dispatch(deleteWishlistItem({ id: id, userId: userId }));
    dispatch(fetchUserWishlist(userId));
  };

  useEffect(() => {
    dispatch(fetchUserWishlist(userId));
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        {wishlist?.map((restaurant, idx) => (
          <Grid item xs={6} key={idx}>
            <Card
              sx={{
                maxWidth: 600,
                maxHeight: 200,
                mt: 1,
                mb: 1,
                ml: 2,
              }}
              className="row"
            >
              <div>
                <img className="image" src={restaurant.imageUrl} />
              </div>
              <Box
                sx={{
                  mt: 7,
                }}
              >
                <div>
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
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default UserWishlist;
