import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchAllRestaurant } from '../restaurant/restaurantSlice';
import {Card,CardActions, CardContent, CardMedia, Button , Typography, Pagination,Stack } from "@mui/material"
import { emoji } from 'node-emoji';

const Suggestion = () => {
    const dispatch = useDispatch()
    const navigate =useNavigate()

    const {preferred,username,zipcode} = useSelector((state)=> state.auth.me);
    const allRestaurants = useSelector((state) => state.restaurant.restaurants);


    const selectedRestaurants = allRestaurants
      .filter((object) => !!object.dba) // restaurant has a name
      .filter((object) => !!object.cuisine_description) // restaurant has a cuisine
      .filter((object) => object.cuisine_description.toLowerCase() === preferred)// filter by preffered cuisine
     .filter((object) => object.critical_flag !== "Critical"); // //  restaurant does not have bad health grade


    useEffect(() => {
        dispatch(fetchAllRestaurant());
      }, []);

  return (
          <div className="container">
            <Typography> These are the places we think you would like {username} {emoji.smiley}</Typography>
            <div></div>
        {selectedRestaurants
          .map((restaurant, idx) => (
            <div key={idx} className="row">
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="70"
                  image="https://toppng.com/uploads/preview/restaurant-png-11554005053riiacqdjki.png"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {restaurant.dba}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Address: {restaurant.building} {restaurant.street},{" "}
                    {restaurant.boro}, NY {restaurant.zipcode}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Check-In</Button>
                  <Button
                    size="small"
                    onClick={() => navigate(`/restaurants/${restaurant.camis}`)}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
      </div>
  )
}

export default Suggestion