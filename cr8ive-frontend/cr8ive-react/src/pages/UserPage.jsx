import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import PostService from '../services/PostService';
import PostList from '../components/PostList';
import LocalStorageService from "../services/LocalStorageService";
import { useJwt } from 'react-jwt';
import './css/UserPage.css'

  function UserPage() {
  const [user, setUser] = useState(null);
  const token = LocalStorageService.get();
  const { decodedToken} = useJwt(token);

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
            <img src={user.profilePicture} className="profile-picture" alt={user.name} />
          </div>
          <PostList userId={user.id} />
        </div>
      )}
    </div>
  );
}

export default UserPage;