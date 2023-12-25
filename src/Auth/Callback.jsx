import React, { useEffect } from 'react';
import Loader from '../Layout/Loader';
import { useAuth0 } from '@auth0/auth0-react';

const Callback = () => {

  const { user } = useAuth0();
  useEffect(() => {
    if (user) {
      window.location.href = `${process.env.PUBLIC_URL}/`;
    }
  });

  return (
    <div>
      <Loader />
    </div>
  );

};

export default Callback;