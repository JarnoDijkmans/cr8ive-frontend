import React, { useState, useEffect } from "react";

function PostCard({ post }) {
  const [imageSrcs, setImageSrcs] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagePromises = post.content.map(async (blobUrl) => {
          const blobResponse = await fetch(blobUrl);
          const blob = await blobResponse.blob();
          const dataUrl = URL.createObjectURL(blob);
          return dataUrl;
        });

        const dataUrls = await Promise.all(imagePromises);
        setImageSrcs(dataUrls);
      } catch (error) {
        console.error("Failed to fetch or display the images:", error);
      }
    };

    if (post.content && post.content.length > 0) {
      fetchImages();
    }
  }, [post.content]);

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={post.userAvatar} alt="User Avatar" />
        <h3>{post.username}</h3>
      </div>
      <div className="post-content">
        {post.description && <p>{post.description}</p>}
        {imageSrcs.map((src, index) => (
          <img key={index} src={src} alt={`Post Content ${index}`} className="post-image" />
        ))}
      </div>
      <div className="post-actions">
        <button>Like</button>
        <button>Comment</button>
        <button>Share</button>
      </div>
    </div>
  );
}

export default PostCard;