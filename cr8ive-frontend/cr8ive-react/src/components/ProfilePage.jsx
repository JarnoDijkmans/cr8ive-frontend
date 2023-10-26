import { useState, useEffect } from "react";
import '../components/ProfilePage.css';


function ProfilePage({ post }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (post && Array.isArray(post.content) && post.content.length > 0) {
      setPosts(post.content);
    } else {
      setPosts([]);
    }
  }, [post]);

  return (
    <div className="profile-user">
      <div className="post-content">
        {posts.map((content, index) => {
          const isImage = content.type.startsWith("image/");
          const isVideo = content.type.startsWith("video/");

          return (
            <div key={index}>
              {isImage ? (
                <img
                  src={content.url}
                  alt={`Post Content ${index}`}
                  className="post-image"
                />
              ) : isVideo ? (
                <video
                  src={content.url}
                  controls
                  className="post-video"
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfilePage;