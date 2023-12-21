import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import PostList from '../components/PostList';
import LocalStorageService from "../services/LocalStorageService";
import { useJwt } from 'react-jwt';
import './css/UserPage.css'

  function UserPage() {
  const [user, setUser] = useState(null);
  const token = LocalStorageService.get();
  const { decodedToken} = useJwt(token || null);

  useEffect(() => {
    if (decodedToken) {
      const userId = decodedToken.userId;
  
      UserService.getUserById(userId)
        .then((userResponse) => {
          setUser(userResponse);
        })
    }
  }, [decodedToken]);

  return (
    <div>
      {user && (
        <div>
          <div className="image-container">
            <img src="../src/images/background-profile.png" className="background-picture" alt="Background image" />
            <div className="eye"></div>
            <img src={user.profilePicture} className="profile-picture" alt={user.firstName} />
          </div>
          <h2>{user.firstName}{user.lastName}</h2>
          <PostList userId={user.id} />
        </div>
      )}
    </div>
  );
}

export default UserPage;