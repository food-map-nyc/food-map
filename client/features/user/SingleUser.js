import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleUser } from "./singleUserSlice";
import Avatar from "@mui/material/Avatar";

export default function SingleUser() {
  const user = useSelector((state) => state.singleUser);
  const dispatch = useDispatch();
  const { userid } = useParams();
  const { email, phone, createdAt, username, imageUrl } = user;
  useEffect(() => {
    dispatch(fetchSingleUser(userid));
  }, []);

  return (
    <div>
      <Avatar src={imageUrl} />
      <div> Username: {username}</div>
      <div> Email: {email}</div>
      <div> Phone: {phone}</div>
      <div> Membership Status: Active</div>
      <div> Member since: {createdAt?.slice(0, 10)}</div>
    </div>
  );
}
