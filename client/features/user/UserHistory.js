import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrRemoveFromFavorites,
  editSingleUserHistory,
  fetchSingleUserHistory,
} from "./userSlice";
import { Modal, Box, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UserHistory(id) {
  const history = useSelector((state) => state.user.currentUserHistory);
  const dispatch = useDispatch();
  const userId = id.id;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const incrementHistory = (id) => {
    dispatch(editSingleUserHistory({ id: id, userId: userId }));
    dispatch(fetchSingleUserHistory(userId));
  };

  const toggleFavorite = (id) => {
    dispatch(addOrRemoveFromFavorites({ id: id, userId: userId }));
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
          <Button variant="outlined" onClick={handleOpen}>
            <CheckCircleOutlineIcon />
            Add to Restaurant History
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Just visited this restaurant?
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  incrementHistory(restaurant.restaurantId);
                  handleClose();
                }}
              >
                <CheckCircleOutlineIcon />
                Add to Restaurant History
              </Button>
            </Box>
          </Modal>
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
      ))}
    </div>
  );
}

export default UserHistory;
