import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MyMap from "./MyMap";
import { getSuggestedResturant } from "./suggestionSlice";
import { emoji } from "node-emoji";
import {CheckCircleOutline, StarOutline , SignalCellularNull, ConstructionOutlined} from '@mui/icons-material'
import {
  Card,
  Button,
  Typography,
  Grid
} from "@mui/material";


const Suggestion = () => {

  const { cuisine, username} = useSelector((state) => state.auth.me);
  const suggestions = useSelector((state)=> state.suggestion.suggested.businesses)

  const dispatch = useDispatch()

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    getLocation()
    const fetchData = async () => {
    if(cuisine && longitude &&latitude) {
      await dispatch(getSuggestedResturant({cuisine,longitude,latitude}))
    }
  }
  fetchData()
    }, [cuisine,longitude, latitude])

  useEffect(() => {
      if (suggestions) {
        setLoading(false);
      }
    }, [suggestions]);

 return loading ? (
      <Typography>
        <img src='https://i.ibb.co/1s9jh58/Your-paragraph-text.gif'></img>
      </Typography>
    ) : (
    <div>
       <div>
        <Typography>
          These are the places we think you would like {username} {emoji.smiley}
        </Typography>
      </div>
      <MyMap selectedRestaurants={suggestions} longitude ={longitude} latitude = {latitude}/>
      <Grid container spacing ={2}>
        {suggestions?.map((restaurant, idx) => (
                <Grid item xs={12} md={6} key={idx}>
                <Card sx={{ maxWidth: 600, maxHeight: 200 }} className="row">
                  <div>
                    <img className="image" src={restaurant.image_url} />
                  </div>
                  <div>
                    <a href = {`/restaurants/${restaurant.id}`}><h3>{restaurant.name}</h3></a>
                    <p>
                      {restaurant.location.display_address[0]},{" "}
                      {restaurant.location.display_address[1]}
                    </p>
                    <p>
                      Cuisine: {restaurant.categories.map(cuisine => cuisine.title).join(", ")}
                    </p>
                    <div>
                      <Button size="small"><CheckCircleOutline/>Check-In</Button>
                      <Button
                        size="small"
                      ><StarOutline/>
                        Wish List
                      </Button>
                    </div>
                  </div>
                </Card>
                </Grid>
              ))}
      </Grid>
    </div>
  );
};


export default Suggestion;
