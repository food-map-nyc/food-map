import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "./singleUserSlice";

export default function UserProfile() {
const { user, isLoggedIn } = useSelector((state) => {
    return {
      user: state.auth.me,
      isLoggedIn: !!state.auth.me.id,
    };
  });
  const dispatch = useDispatch();
const {id,email,phone,createdAt, username} = user
  useEffect(() => {
    dispatch(fetchSingleUser(user.id));
  }, []);

  return (
    <div className="pb-96">
      {!id ? (
        <div>Loading User information ...</div>
      ) : (
<>
    <div>
    <div> Hi, {username}</div>
    <h4>Welcome to your User Dashboard</h4>
    <div> Email: {email}</div>
    <div> You can be reached at: {phone}</div>
    <div>Membership Status: Active</div>
    <div>Avid Foodie since{createdAt.slice(0, 10)}

    </div>
    </div>
        <div/>
        </>
      )}
    </div>
  );
}
