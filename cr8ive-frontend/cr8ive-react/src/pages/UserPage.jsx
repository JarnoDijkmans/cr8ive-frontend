import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import './css/UserPage.css'

function UserPage() {
 const [user, setUser] = useState(null);

 useEffect(() => {
    const jwt = localStorage.getItem('accessToken');

    if (jwt) {
      const tokenParts = jwt.split('.');
      
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const userId = payload.userId; 
        
        UserService.getUserById(userId)
        .then(response => {
          setUser(response);
        })
        .catch(error => {
          console.error(error);
        });
      }
    }
  }, []);


 return (
   <div>
     {user && (
        <div>
          <div className="image-container">
            <img src= "../src/images/background-profile.png" className="background-picture" alt="Background image" />
            <div className="eye"></div>
            <img src={user.profilePicture} className="profile-picture" alt={user.name} />
          </div>
          <h1>{user.firstName}</h1>
          <p>{user.emailAddress}</p>
          
        </div>
      )}
   </div>
 );
}

export default UserPage;