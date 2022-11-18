import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid
} from "@mui/material";
import { emoji } from "node-emoji";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import MyMap from "./MyMap";
import { fetchByCuisine } from "../restaurant/restaurantSlice";

const Suggestion = () => {
  const navigate = useNavigate();

  const { cuisine, username } = useSelector((state) => state.user.user);
  const allRestaurants = useSelector((state) => state.restaurant.restaurants);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchByCuisine({cuisine, page:1}))
  }, [])

  return (
    <div>
       <div>
        <Typography>
          These are the places we think you would like {username} {emoji.smiley}
        </Typography>
      </div>
      <MyMap selectedRestaurants={allRestaurants} />
      <Grid container spacing ={2}>
        {allRestaurants.businesses
          ? allRestaurants.businesses
              .map((restaurant, idx) => (
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
                      <Button size="small"><CheckCircleOutlineIcon/>Check-In</Button>
                      <Button
                        size="small"
                      ><StarOutlineIcon/>
                        Wish List
                      </Button>
                    </div>
                  </div>
                </Card>
                </Grid>
              ))
          : null}
      </Grid>
    </div>
  );
};

  
//   return (
//     <div>
//       <div>
//         <Typography>
//           These are the places we think you would like {username} {emoji.smiley}
//         </Typography>
//       </div>
//       <div className="container">
//         {/* <MyMap selectedRestaurants={allRestaurants} /> */}
//         {allRestaurants.businesses?.map((restaurant, idx) => (
//           <div key={idx}>
//             <Card sx={{ maxWidth: 345 }}>
//               <CardMedia
//                 component="img"
//                 height="70"
//                 image="https://toppng.com/uploads/preview/restaurant-png-11554005053riiacqdjki.png"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   {restaurant.dba}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Address: {restaurant.building} {restaurant.street},{" "}
//                   {restaurant.boro}, NY {restaurant.zipcode}
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small">Check-In</Button>
//                 <Button
//                   size="small"
//                   onClick={() => navigate(`/restaurants/${restaurant.camis}`)}
//                 >
//                   Learn More
//                 </Button>
//               </CardActions>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export default Suggestion;
