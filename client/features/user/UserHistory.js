import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrRemoveFromFavorites, fetchSingleUserHistory } from "./userSlice";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button, Grid, Card, Box } from "@mui/material";

function UserHistory() {
  const history = useSelector((state) => state.user.currentUserHistory);
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const userId = user.id;

  const toggleFavorite = (id) => {
    dispatch(addOrRemoveFromFavorites({ id: id, userId: userId }));
    dispatch(fetchSingleUserHistory(userId));
  };

  useEffect(() => {
    dispatch(fetchSingleUserHistory(userId));
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        {history?.map((restaurant, idx) => (
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
                  mt: 5,
                }}
              >
                <div>
                  <a href={`/restaurants/${restaurant.restaurantId}`}>
                    <h3>{restaurant.restaurantName}</h3>
                  </a>
                  <p>Times visited: {restaurant.timesVisited}</p>
                  <a href={`/restaurants/${restaurant.restaurantId}`}>
                    <Button variant="outlined">
                      <CheckCircleOutlineIcon />
                      Check-In
                    </Button>
                  </a>
                  {restaurant.favorite ? (
                    <Button
                      variant="outlined"
                      onClick={() => toggleFavorite(restaurant.restaurantId)}
                    >
                      <Favorite />
                      Remove from Favorites
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => toggleFavorite(restaurant.restaurantId)}
                    >
                      <FavoriteBorder />
                      Add to Favorites
                    </Button>
                  )}
                </div>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default UserHistory;
