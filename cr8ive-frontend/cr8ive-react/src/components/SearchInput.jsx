import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import "./SearchInput.css";

function SearchInput() {
  const [searchResults, setSearchResults] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const fetchUserByName = (inputValue) => {
    if (inputValue.length >= 1) {
      UserService.getUserByName(inputValue)
        .then((response) => {
          console.log('API Response:', response);
          if (response) {
            setSearchResults(response); 
          }
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    } else {
      setSearchResults([]); 
    }
   };

  const handleClick = () => {
    setIsClicked(true);
  };

  const handleUserClick = (user) => {
    setIsClicked(false); 
    navigate(`/user/${user.id}`, { state: { user } });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".results-container")) {
        setIsClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container">
      <div className="search-bar-container">
        <input
          className={`search-bar ${isClicked ? 'pressed' : ''}`}
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            fetchUserByName(e.target.value);
          }}
          onClick={handleClick}
        />
      </div>
      {isClicked && searchResults.length > 0 && ( 
        <div className="results-container">
          {searchResults.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user)}
            >
              {user.firstName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchInput;