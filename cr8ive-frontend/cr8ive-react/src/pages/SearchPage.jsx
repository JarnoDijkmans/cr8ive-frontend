import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

function SearchPage() {
  const [searchUser, setSearchUser] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const fetchUser = () => {
    UserService.getUser(searchUser)
      .then((response) => {
        console.log('API Response:', response);
        if (response && response.user) {
          setSearchResults(response.user);
        }
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  };

  return (
    <div>
      <h2>Discover</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchUser}
          onChange={(e) => {
            setSearchUser(e.target.value);
            fetchUser();
          }}
        />
        <div className="search-results">
          {searchResults.map((user) => (
            <div
              key={user.id}
              onClick={() => navigate(`/user/${user.id}`, { state: { user } })}
            >
              {user.firstName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
