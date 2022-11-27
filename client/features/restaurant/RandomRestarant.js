import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThumbDownAlt } from "@mui/icons-material";
import { Button } from "@mui/material";
import { emoji } from "node-emoji";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Star } from "@mui/icons-material";
import {
  fetchUserWishlist,
  createNewWishlistItem,
  deleteWishlistItem,
} from "../user/userSlice";
import { Box } from "@mui/material";
import { fetchFeatured } from "./restaurantSlice";

const RandomRestaurant = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const wishlist = useSelector((state) => state.user.currentUserWishlist);
  const userId = user.id;
  const featuredRestaurants = useSelector(
    (state) => state.restaurant.featured.businesses
  );

  const randomIndex = Math.floor(Math.random() * featuredRestaurants.length);
  const {
    id,
    name,
    image_url,
    location,
    display_phone,
    categories,
    price,
    rating,
    review_count,
  } = featuredRestaurants[randomIndex];

  const isOnWishlist = () => {
    for (let i = 0; i < wishlist.length; i++) {
      if (wishlist[i].restaurantName === name) {
        return true;
      }
    }
    return false;
  };

  const removeFromWishlist = () => {
    dispatch(deleteWishlistItem({ id: id, userId: userId }));
    dispatch(fetchUserWishlist(userId));
  };

  const addToWishlist = () => {
    dispatch(
      createNewWishlistItem({
        id: id,
        userId: userId,
        name: name,
        imageUrl: image_url,
      })
    );
    dispatch(fetchUserWishlist(userId));
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserWishlist(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (wishlist) {
      isOnWishlist();
    }
  }, [wishlist]);

  return (
    <div>
      <h1>The next restaurant that you should try is ... </h1>
      <div className="container">
        <div className="single">
          <img src={image_url} />
        </div>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 3,
            p: 10,
          }}
        >
          <div>
            <a href={`/restaurants/${id}`}>
              <h1>{name}</h1>
            </a>
            <p>
              Rating: {rating}
              {emoji.star} ({review_count} reviews)
            </p>
            <p>Price: {price}</p>
            <p>
              Address: {location?.display_address[0]},{" "}
              {location?.display_address[1]}
            </p>
            <p>Phone Number: {display_phone}</p>
            <p>
              Cuisine: {categories?.map((cuisine) => cuisine.title).join(", ")}
            </p>
            {isLoggedIn && (
              <div>
                <a href={`/restaurants/${id}`}>
                  <Button variant="outlined">
                    <CheckCircleOutlineIcon />
                    Check-In
                  </Button>
                </a>
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
            )}
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/random");
              }}
              startIcon={<ThumbDownAlt sx={{ fontSize: 40 }} />}
            >
              Don't Like What You See? Click Again!
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default RandomRestaurant;
