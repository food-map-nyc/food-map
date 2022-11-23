import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "./userSlice";
import EditUser from "./EditUser";
import UserHistory from "./UserHistory";
import UserWishlist from "./UserWishlist";
import UserFavorites from "./UserFavorites";
import { Card, CardHeader, CardMedia, Collapse, Avatar, Typography, Button, Box, Stack } from "@mui/material";
import { red } from "@mui/material/colors";


export default function UserProfile() {
  const user = useSelector((state) => state.auth.me);
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { id, email, phone, createdAt, username, imageUrl, cuisine, zipcode } =
    currentUser;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    dispatch(fetchSingleUser(user.id));
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
            maxWidth: 550,
            margin: 4,
          }}
        >
          <Stack spacing={4}>
          <Typography component="div" fontSize="30px">
              <strong>Welcome to your user dashboard</strong>
            </Typography>
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
            <Button onClick={handleExpandClick}>
              <Typography component="div" fontSize="30px" color="black">
                Edit Profile
              </Typography>
            </Button>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <EditUser id={id} user={user} />
            </Collapse>
          </Stack>
        </Box>
      </Card>
      {id && (
        <>
          <UserHistory />
          <UserWishlist />
          <UserFavorites />
        </>
      )}
    </>
  );
}
