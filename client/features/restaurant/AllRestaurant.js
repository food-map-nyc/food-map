
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllRestaurant } from "./restaurantSlice"; //i didnt call this anywhere but reesturants still shows uo?

const AllRestaurant = () => {
    const allRestaurants = useSelector((state) => state.restaurant.restaurants.businesses);
console.log(allRestaurants, "all restaurants")

  return (
    <div>
      <>this is the resturant name list </>
      {allRestaurants?.map((restaurant)=> {
        <p key = {restaurant.id}>{restaurant.name}</p>
      })}


      {/* {allRestaurants && allRestaurants.length? allRestaurants.map((restaurant)=> {
        <p key = {restaurant.id}>{restaurant.name}</p>
      */}
    </div>
  )
}

export default AllRestaurant

