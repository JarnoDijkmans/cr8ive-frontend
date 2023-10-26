import { useState } from "react";
import PostService from "../services/PostService";
import ProfilePage from "../components/ProfilePage";

function SearchPage() {
  const [userPosts, setUserPosts] = useState([]);
  const [searchUserId, setSearchUserId] = useState("");

  const fetchUserPosts = () => {
    PostService.getUserPosts(searchUserId)
      .then((response) => {
        console.log('API Response:', response);
        if (response) {
            setUserPosts(response);
          } else {
            setUserPosts([]);
          }
      })
      .catch((error) => {
        console.error('Error fetching user posts:', error);
      });
  };

  const handleSearch = () => {
    fetchUserPosts();
  };

  return (
    <div>
      <h2>For You Page</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter User ID"
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="post-list">
            {userPosts.length > 0 ? (
                userPosts.map((post) => (
                <ProfilePage key={post.id} post={post} />
                ))
            ) : (
                <p>No posts found.</p>
            )}
        </div>
    </div>
  );
}

export default SearchPage;