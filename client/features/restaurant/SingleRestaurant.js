import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleUserHistory,
  editSingleUserHistory,
  addOrRemoveFromFavorites,
  createNewUserHistory,
  createNewWishlistItem,
  fetchUserWishlist,
  deleteWishlistItem,
} from "../user/userSlice";
import { fetchSingleRestaurant } from "./restaurantSlice";
import { Rating, Modal, Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Favorite, FavoriteBorder, Star } from "@mui/icons-material";
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

const SingleRestaurant = () => {
  const { objectid } = useParams();
  const {
    name,
    image_url,
    location,
    display_phone,
    categories,
    price,
    rating,
    review_count,
  } = useSelector((state) => state.restaurant.restaurant);

  const user = useSelector((state) => state.auth.me);
  const history = useSelector((state) => state.user.currentUserHistory);
  const wishlist = useSelector((state) => state.user.currentUserWishlist);
  const userId = user.id;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const findTimesVisited = () => {
    for (let i = 0; i < history.length; i++) {
      if (history[i].restaurantName === name) {
        return history[i].timesVisited;
      }
    }
    return 0;
  };

  const isFavorite = () => {
    for (let i = 0; i < history.length; i++) {
      if (history[i].restaurantName === name) {
        return history[i].favorite;
      }
    }
  };

  const isOnWishlist = () => {
    for (let i = 0; i < wishlist.length; i++) {
      if (wishlist[i].restaurantName === name) {
        return true;
      }
    }
    return false;
  };

  const incrementHistory = () => {
    dispatch(editSingleUserHistory({ id: objectid, userId: userId }));
    dispatch(fetchSingleUserHistory(userId));
  };

  const addToHistory = () => {
    dispatch(
      createNewUserHistory({ id: objectid, userId: userId, name: name })
    );
    dispatch(fetchSingleUserHistory(userId));
  };

  const toggleFavorite = () => {
    dispatch(addOrRemoveFromFavorites({ id: objectid, userId: userId }));
    dispatch(fetchSingleUserHistory(userId));
  };

  const addToWishlist = () => {
    dispatch(
      createNewWishlistItem({ id: objectid, userId: userId, name: name })
    );
    dispatch(fetchUserWishlist(userId));
  };

  const removeFromWishlist = () => {
    dispatch(deleteWishlistItem({ id: objectid, userId: userId }));
    dispatch(fetchUserWishlist(userId));
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchSingleRestaurant(objectid));
      dispatch(fetchSingleUserHistory(userId));
      dispatch(fetchUserWishlist(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (history) {
      findTimesVisited();
      isFavorite();
      isOnWishlist();
    }
  }, [history]);

  return (
    <div className="container">
      <div className="single">
        <img src={image_url} />
      </div>
      <div>
        <h1>{name}</h1>
        <p>
          Rating:{" "}
          {rating ? (
            <Rating name="half-rating" defaultValue={rating} precision={0.5} />
          ) : null}{" "}
          ({review_count} reviews)
        </p>
        <p>Price: {price}</p>
        <p>
          Address: {location?.display_address[0]},{" "}
          {location?.display_address[1]}
        </p>
        <p>Phone Number: {display_phone}</p>
        <p>Cuisine: {categories?.map((cuisine) => cuisine.title).join(", ")}</p>
        <div>
          {findTimesVisited() ? (
            <div>
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
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Just visited this restaurant?
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      incrementHistory();
                      handleClose();
                    }}
                  >
                    <CheckCircleOutlineIcon />
                    Add to Restaurant History
                  </Button>
                </Box>
              </Modal>
              {isFavorite() ? (
                <Button variant="outlined" onClick={toggleFavorite}>
                  <Favorite />
                  Remove from Favorites
                </Button>
              ) : (
                <Button variant="outlined" onClick={toggleFavorite}>
                  <FavoriteBorder />
                  Add to Favorites
                </Button>
              )}
            </div>
          ) : (
            <div>
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
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Just visited this restaurant?
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      addToHistory();
                      handleClose();
                    }}
                  >
                    <CheckCircleOutlineIcon />
                    Add to Restaurant History
                  </Button>
                </Box>
              </Modal>
            </div>
          )}
          {isOnWishlist() ? (
            <Button variant="outlined" onClick={removeFromWishlist}>
              <Star />
              Remove From Wishlist
            </Button>
          ) : (
            <Button variant="outlined" onClick={addToWishlist}>
              <StarOutlineIcon />
              Add to Wishlist
            </Button>
          )}
        </div>
        <p>Phone Number: {display_phone}</p>
        <p>Cuisine: {categories?.map((cuisine) => cuisine.title).join(", ")}</p>
        {userId && (
          <div>
            <p>
              {findTimesVisited()
                ? `You have been here ${findTimesVisited()} times`
                : "You have not been here yet!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleRestaurant;
