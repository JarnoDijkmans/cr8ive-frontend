import { useLocation, useNavigate  } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useJwt } from 'react-jwt';
import SearchInput from "./components/SearchInput";
import UserService from "./services/UserService";
import LocalStorageService from "./services/LocalStorageService";
import Logout from "./components/Logout";



function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = LocalStorageService.get();
  const { decodedToken} = useJwt(token);

  const handleSearch = (searchResult) => {
    navigate(`/search?q=${searchResult}`); 
  };

  useEffect(() => {
    if (decodedToken) {
      const userId = decodedToken.userId;
      UserService.getUserById(userId)
        .then((response) => {
          setUser(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [decodedToken]);

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
            {location.pathname === "/YourPage" ? (
              <Logout />
            ) : (
            <a href="/YourPage">You <img src={user.profilePicture} className="profile-image" /></a>
            )}
          </ul>
        )}
      </li>
    </div>
  );
}

export default NavBar;