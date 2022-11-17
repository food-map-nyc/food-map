import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleRestaurant } from "./restaurantSlice";

const SingleRestaurant = () => {
  const { id } = useParams();
  const singleRestaurant = useSelector((state) => state.restaurant.restaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleRestaurant(id));
  }, []);

  const {name, image_url} = singleRestaurant;

  return (
    <div>
        <img
          src={image_url}
        />
      <div>
        <h1>{name}</h1>
        {/* <p>
          Address: {building} {street}, {boro} NY {zipcode}
        </p>
        <p>Phone Number: {phone}</p>
        <p>Cuisine: {cuisine_description}</p> */}
      </div>
    </div>
  );
};

export default SingleRestaurant;