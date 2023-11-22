import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PostService from "../services/PostService";
import UserService from "../services/UserService";
import './css/ProfilePage.css';

function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      let user;
      if (location.state && location.state.user) {
        user = location.state.user;
      } else {
        user = await UserService.getUserById(userId);
      }
      setUser(user);

      const response = await PostService.getUserPosts(userId);
      if (response) {
        setPosts(response);
      } else {
        setPosts([]);
      }
    };

    fetchUserAndPosts();
  }, [userId, location.state]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-user">
      <h2>{user.firstName}</h2>
      {posts.map((post, index) => {
        const firstContent = post.content[0];
        const isImage = firstContent.type.startsWith("image/");
        const isVideo = firstContent.type.startsWith("video/");

        return (
          <div key={index} className="post-content">
            {isImage ? (
              <img
                src={firstContent.url}
                alt={`Post Content ${index}`}
                className="post-image"
              />
            ) : isVideo ? (
              <video
                src={firstContent.url}
                controls
                className="post-video"
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default ProfilePage;