import React from 'react';
import { useSelector } from 'react-redux';
import UserProfile from '../user/userProfile';

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <UserProfile/>
    </div>
  );
};

export default Home;