import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleUser } from "./userSlice";
import { Card, CardHeader, CardMedia, Avatar, Typography, Box, Stack } from "@mui/material";
import { red } from "@mui/material/colors";

export default function SingleUser() {
  const { email, phone, createdAt, username, imageUrl, cuisine, zipcode } =
    useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { userid } = useParams();
  useEffect(() => {
    dispatch(fetchSingleUser(userid));
  }, []);

  return (
      <>
        <Card sx={{ display: "flex", pl: 1, pb: 1 }}>
          <Card sx={{ maxHeight: 600 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="username">
                  {username && username[0]}
                </Avatar>
              }
              title={
                <Typography fontSize="30px">Username: {username}</Typography>
              }
              subheader={
                <Typography fontSize="24">
                  Active member since: {createdAt?.slice(0, 10)}
                </Typography>
              }
            />
            <Box
              sx={{
                width: 500,
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 500, height: 500 }}
                image={imageUrl}
              />
            </Box>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 800,
              margin: 4,
            }}
          >
            <Stack spacing={4}>
              <Typography component="div" fontSize="30px">
                Membership status: Active
              </Typography>
              <Typography component="div" fontSize="30px">
                Email: {email}
              </Typography>
              <Typography component="div" fontSize="30px">
                Phone: {phone}
              </Typography>
              <Typography component="div" fontSize="30px">
                Favorite Cuisine: {cuisine}
              </Typography>
              <Typography component="div" fontSize="30px">
                Zipcode: {zipcode}
              </Typography>
            </Stack>
          </Box>
        </Card>
      </>
  );
}
