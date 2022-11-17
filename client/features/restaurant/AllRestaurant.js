
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  CardContent,
  Grid,
  Typography,
  Pagination,
  Box,
} from "@mui/material";
import { fetchAllRestaurant } from "./restaurantSlice";

/**
 * COMPONENT
 */
 const AllRestaurant = () => {
  const user = useSelector((state) => state.auth.me);
  const userId = user.id;

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

  const dispatch = useDispatch();
  const allRestaurants = useSelector((state) => state.restaurant.restaurants.businesses);


  useEffect(() => {
    dispatch(fetchAllRestaurant());
  }, []);

  useEffect(() => {
    if (allRestaurants.length > 0) {
      setLoading(false);
    }
  }, [allRestaurants]);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  return loading ? (
    <Typography>
      <img src="https://i.ibb.co/3F9Q14c/Albums-2.gif"></img>
    </Typography>
  ) : (
    <div>
      <div>
        <Grid container>
          {allRestaurants && allRestaurants.length
            ? allRestaurants
                .map(({ id, name, image_url }) => {
                  return (
                    <Grid item key={id} xs={12} sm={6} md={4} lg={4}>
                      <CardContent>
                        <Link to={`/restaurants/${id}`}>
                          <Button>
                            <Typography
                              variant="h6"
                              fontFamily="Barlow Condensed"
                            > {name}
                            </Typography>
                          </Button>
                          <br></br>
                          <img
                            src={image_url}
                            loading="lazy"
                            width="300px"
                            height="300px"
                          />
                        </Link>
                        <br></br>
                      </CardContent>
                    </Grid>
                  );
                })
                .slice(indexOfFirstPost, indexOfLastPost)
            : null}
        </Grid>
        <Box
          justifyContent={"center"}
          alignItems="center"
          display={"flex"}
          sx={{ margin: "20px 0px" }}
        >
          <Pagination
            count={Math.ceil(allRestaurants.length / 9)}
            onChange={(e, value) => setCurrentPage(value)}
          />
        </Box>
      </div>
    </div>
  );
};

export default AllRestaurant


