import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUserHistory, addOrRemoveFromFavorites } from "./userSlice";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button, Grid, Card } from "@mui/material";

function UserFavorites(id) {
  const favorites = useSelector(
    (state) => state.user.currentUserHistory
  ).filter((restaurant) => restaurant.favorite === true);
  const dispatch = useDispatch();
  const userId = id.id;

  const toggleFavorite = (id) => {
    dispatch(addOrRemoveFromFavorites({ id: id, userId: userId }));
    dispatch(fetchSingleUserHistory(userId));
  };

  useEffect(() => {
    dispatch(fetchSingleUserHistory(userId));
  }, []);

  return (
    <div>
      <h2>Favorites</h2>
      {favorites?.map((restaurant, idx) => (
        <Grid item xs={12} md={6} key={idx}>
          <Card sx={{ maxWidth: 600, maxHeight: 200 }} className="row">
            <div>
              <img className="image" src={restaurant.imageUrl} />
            </div>
            <div>
              <a href={`/restaurants/${restaurant.id}`}>
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
          </Card>
        </Grid>
      ))}
      {/* {favorites?.map((restaurant, idx) => (
        <div key={idx}>
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
          {restaurant.favorite && (
            <Button
              variant="outlined"
              onClick={() => toggleFavorite(restaurant.restaurantId)}
            >
              <Favorite />
              Remove from Favorites
            </Button>
          )}
        </div>
      ))} */}
    </div>
  );
}

export default UserFavorites;
