import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "./userSlice";
import EditUser from "./EditUser";
import UserHistory from "./UserHistory";
import UserWishlist from "./UserWishlist";
import UserFavorites from "./UserFavorites";
import { Avatar, Typography, Card } from "@mui/material";

export default function UserProfile() {
  const user = useSelector((state) => state.auth.me);
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { id, email, phone, createdAt, username, imageUrl, cuisine, zipcode } =
    currentUser;
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
          <UserHistory id={id} />
          <UserWishlist id={id} />
          <UserFavorites id={id} />
          <div />
        </>
      )}
    </div>
  );
}
