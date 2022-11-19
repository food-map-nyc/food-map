import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleUser } from "./userSlice";
import Avatar from "@mui/material/Avatar";

export default function SingleUser() {
  const { email, phone, createdAt, username, imageUrl, cuisine, zipcode } =
    useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { userid } = useParams();
  useEffect(() => {
    dispatch(fetchSingleUser(userid));
  }, []);

  return (
    <div>
      <Avatar src={imageUrl} />
      <div> Username: {username}</div>
      <div> Email: {email}</div>
      <div> Phone: {phone}</div>
      <div> Zipcode: {zipcode}</div>
      <div> Membership Status: Active</div>
      <div> Member since: {createdAt?.slice(0, 10)}</div>
      <div> Member's Preferred Cuisine: {cuisine}</div>
    </div>
  );
}
