import { useLocation, useNavigate  } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import SearchInput from "./components/SearchInput";
import UserService from "./services/UserService";


function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleSearch = (searchResult) => {
    navigate(`/search?q=${searchResult}`); 
  };

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
    <div className="nav">
      <li>
        <ul>
          <a href="/search">Cr8ive</a>
        </ul>
        {location.pathname === "/search" ? (
        <ul>
          <SearchInput retrieveSearchUsers={handleSearch} />
        </ul>
          ) : (
            <ul>
              <a href="/search">Search</a>
            </ul>
          )}
           {user && (
        <ul>
          <a href="/YourPage">You <img src={user.profilePicture} className="profile-image" /></a>
        </ul>
        )}
      </li>
    </div>
  );
}

export default NavBar;