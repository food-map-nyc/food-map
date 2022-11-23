import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "./userSlice";
import EditUser from "./EditUser";
import UserHistory from "./UserHistory";
import UserWishlist from "./UserWishlist";
import UserFavorites from "./UserFavorites";
import { Avatar, Typography, Card } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchSingleUser(user.id));
  }, []);

  return (
    <div className="pb-96">
      {!id ? (
        <div>Loading User information ...</div>
      ) : (
        <>
          <Card>
            <Avatar
              src={imageUrl}
              margin-right="true"
              background-color="yellow"
              sx={{ width: 76, height: 76 }}
            />
            <Typography> Hi, {username}</Typography>

            <h4>Welcome to your User Dashboard</h4>
            <div> Email: {email}</div>
            <div> Zipcode: {zipcode}</div>
            <div> You can be reached at: {phone}</div>
            <div>Membership Status: Active</div>
            <div>Avid Foodie since {createdAt.slice(0, 10)}</div>
            <div>Member's preferred cuisine is {cuisine}</div>
          </Card>
          <EditUser id={id} user={user} />
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
          <div />
        </>
      )}
    </div>
  );
}
