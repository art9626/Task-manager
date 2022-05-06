import React from 'react';
import Friends from '../components/Friends';
import Users from '../components/Users';

const FriendsPage: React.FC = () => {
  return (
    <section>
      <Friends />
      <Users />
    </section>
  );
};

export default FriendsPage;