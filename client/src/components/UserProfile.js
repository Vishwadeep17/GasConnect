import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);

  // Simulate fetching user data from an API
  useEffect(() => {
    // Replace this with your actual API call
    fetch('/api/user')
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Your User Profile</h1>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Address: {user.address}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default UserProfile;
