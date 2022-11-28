import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "./userSlice";
import EditUser from "./EditUser";
import UserHistory from "./UserHistory";
import UserWishlist from "./UserWishlist";
import UserFavorites from "./UserFavorites";
import {
  Card,
  CardHeader,
  CardMedia,
  Collapse,
  Avatar,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { red } from "@mui/material/colors";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

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

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            <Button onClick={handleExpandClick} variant="contained">
              <Typography component="div" fontSize="30px" color="white">
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
        <div className={"tabbed-list"}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "white",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="History" />
              <Tab label="Favorites" />
              <Tab label="Wishlist" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <UserHistory id={id} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserFavorites id={id} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <UserWishlist id={id} />
          </TabPanel>
        </div>
      )}
    </>
  );
}
