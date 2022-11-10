import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleRestaurant } from "./restaurantSlice";

const SingleRestaurant = () => {
  const { objectid } = useParams();
  const singleRestaurant = useSelector((state) => state.restaurant.restaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleRestaurant(objectid));
  }, []);

  const { dba, building, street, boro, zipcode, phone, cuisine_description } = singleRestaurant;

  return (
    <div>
        <img
          src={`https://toppng.com/uploads/preview/restaurant-png-11554005053riiacqdjki.png`}
        />
      <div>
        <h1>{dba}</h1>
        <p>
          Address: {building} {street}, {boro} NY {zipcode}
        </p>
        <p>Phone Number: {phone}</p>
        <p>Cuisine: {cuisine_description}</p>
      </div>
    </div>
  );
};

export default SingleRestaurant;