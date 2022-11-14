import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "./singleUserSlice";
import EditUser from "./EditUser";
import { Avatar, Typography, Card } from "@mui/material";

export default function UserProfile() {
  const { user, isLoggedIn } = useSelector((state) => {
    return {
      user: state.auth.me,
      isLoggedIn: !!state.auth.me.id,
    };
  });
  const dispatch = useDispatch();
  const { id, email, phone, createdAt, username, imageUrl } = user;
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
            <div> You can be reached at: {phone}</div>
            <div>Membership Status: Active</div>
            <div>Avid Foodie since {createdAt.slice(0, 10)}</div>
          </Card>
          <EditUser id={id} user={user} />
          <div />
        </>
      )}
    </div>
  );
}
