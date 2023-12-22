import React, { useEffect, useState } from 'react';

const UserLogged = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/user_info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          setUserInfo(data);
        } else {
          // Redirect to login if user is not logged in
          window.location.replace('/login');
        }
      } catch (error) {
        console.error('Error fetching user info:', error.message);
        // Redirect to login on error
        window.location.replace('/login');
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      {userInfo && (
        <div></div>
      )}
    </div>
  );
};

export default UserLogged;
