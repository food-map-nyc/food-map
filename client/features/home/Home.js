import React from 'react';
import { useSelector } from 'react-redux';
import UserProfile from '../user/UserProfile';

/**
 * COMPONENT
 */
const Home = () => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <UserProfile/>
    </div>
  );
};

export default Home;