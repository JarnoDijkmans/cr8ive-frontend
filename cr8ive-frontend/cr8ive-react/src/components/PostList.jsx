import React, { useState, useEffect } from 'react';
import './styles/PostList.css';
import PostService from '../services/PostService';
import CreateNewPost from '../pages/CreatePostPage'; 

const PostList = ({ userId }) => {
  const [selectedNavItem, setSelectedNavItem] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (selectedNavItem === 'All') {
      PostService.getUserPosts(userId)
        .then((response) => {
          setFilteredPosts(response);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });
    }
  }, [selectedNavItem, userId]);

  const handleNavItemClick = (navItem) => {
    setSelectedNavItem(navItem);
  };

  return (
    <div className='test'>
      <div className="navigation">
        <div
          className={`nav-item ${selectedNavItem === 'All' ? 'selected' : ''}`}
          onClick={() => handleNavItemClick('All')}
        >
          All
        </div>
        <div
          className={`nav-item ${selectedNavItem === 'CreateNewPost' ? 'selected' : ''}`}
          onClick={() => handleNavItemClick('CreateNewPost')}
        >
          Create-new-Post
        </div>
      </div>

      {selectedNavItem === 'CreateNewPost' && <CreateNewPost userId={userId} />}

      {selectedNavItem !== 'CreateNewPost' && (
        <div className="container-postlist">
          {filteredPosts.map((post, index) => {
            const firstContent = post.content[0];
            const isImage = firstContent.type.startsWith("image/");
            const isVideo = firstContent.type.startsWith("video/");

            return (
              <div key={index} className="gallery">
                {isImage ? (
                  <img
                    src={firstContent.url}
                    alt={`Post Content ${index}`}
                    className="content-image"
                  />
                ) : isVideo ? (
                  <video
                    src={firstContent.url}
                    controls
                    className="content-video"
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostList;