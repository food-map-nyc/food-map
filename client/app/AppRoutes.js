import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import AllRestaurant from "../features/restaurant/AllRestaurant";
import SingleRestaurant from "../features/restaurant/SingleRestaurant";
import AllUsers from "../features/user/AllUsers";
import SingleUser from "../features/user/SingleUser";
import Suggestion from "../features/suggestion/Suggestion";
import FeaturedRestaurant from "../features/restaurant/FeaturedRestaurant";
/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<FeaturedRestaurant />} />
          <Route to="/home" element={<Home />} />
          <Route path="/restaurants" element={<AllRestaurant />} />
          <Route
            path={`/restaurants/:objectid`}
            element={<SingleRestaurant />}
          />
          {user.isAdmin ? (
            <Route path={"/users"} element={<AllUsers />} />
          ) : null}
          {user.isAdmin ? (
            <Route path={`/users/:userid`} element={<SingleUser />} />
          ) : null}
          <Route path={"/suggestion"} element={<Suggestion />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<FeaturedRestaurant />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/restaurants" element={<AllRestaurant />} />
          <Route
            path={`/restaurants/:objectid`}
            element={<SingleRestaurant />}
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
