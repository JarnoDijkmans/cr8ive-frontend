import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PostService from "../services/PostService";
import '../pages/ProfilePage.css';

function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const { userId } = useParams();

  useEffect(() => {
    PostService.getUserPosts(userId)
      .then((response) => {
        console.log('API Response:', response);
        if (response) {
          setPosts(response);
        } else {
          setPosts([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching user posts:', error);
      });
  }, [userId]);

  return (
    <div className="profile-user">
      <h2>{location.state.user.firstName}'s Posts</h2>
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