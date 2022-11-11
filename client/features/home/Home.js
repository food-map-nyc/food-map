import React from 'react';
import { useSelector } from 'react-redux';
import UserProfile from '../user/UserProfile';

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const id = useSelector((state) => state.auth.me.id);

  return (
    <div>
      <UserProfile/>
    </div>
  );
};

export default Home;