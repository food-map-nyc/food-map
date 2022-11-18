import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleRestaurant } from "./restaurantSlice";
import { Rating } from "@mui/material";

const SingleRestaurant = () => {
  const { objectid } = useParams();
  const singleRestaurant = useSelector((state) => state.restaurant.restaurant);
  console.log(singleRestaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleRestaurant(objectid));
  }, []);

  const {
    name,
    image_url,
    location,
    display_phone,
    categories,
    price,
    rating,
    review_count,
  } = singleRestaurant;

  return (
    <div className="container">
      <div>
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
      </div>
    </div>
  );
};

export default SingleRestaurant;
