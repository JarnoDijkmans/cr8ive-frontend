import React, { useState, useEffect } from 'react';
import './styles/PostList.css';
import PostService from '../services/PostService';
import CreateNewPost from '../pages/CreatePostPage';
import LocalStorageService from '../services/LocalStorageService';
import PostDetail from './PostDetail';
import Modal from 'react-modal';

const PostList = ({ userId }) => {
  const [selectedNavItem, setSelectedNavItem] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const storedUser = LocalStorageService.DecodeAccessTokenReturnUserId();
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const navItems = storedUser === userId
    ? [
        { id: 'All', label: 'All' },
        { id: 'CreateNewPost', label: 'Create-new-Post' },
      ]
    : [{ id: 'All', label: 'All' }];

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

  useEffect(() => {
    if (isDetailOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDetailOpen]);

  const handleNavItemClick = (itemId) => {
    setSelectedNavItem(itemId);
  };

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
    setIsDetailOpen(true);
  };

  const handleModalClose = () => {
    setIsDetailOpen(false);
  };

  return (
    <div className='test'>
      <div className="navigation">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${selectedNavItem === item.id ? 'selected' : ''}`}
            style={{ width: `calc(100% / ${navItems.length})` }}
            onClick={() => handleNavItemClick(item.id)}
          >
            {item.label}
          </div>
        ))}
      </div>

      {selectedNavItem === 'CreateNewPost' && <CreateNewPost userId={userId} />}

      {selectedNavItem !== 'CreateNewPost' && (
        <div className="container-postlist">
          {filteredPosts.map((post, index) => {
            const firstContent = post.content[0];
            const isImage = firstContent.type.startsWith('image/');
            const isVideo = firstContent.type.startsWith('video/');

            return (
              <div key={index} className="gallery" onClick={() => handlePostClick(post.id)}>
                {isImage ? (
                  <img
                    src={firstContent.url}
                    alt={`Post Content ${index}`}
                    className="content-image"
                  />
                ) : isVideo ? (
                  <video
                    src={firstContent.url}
                    controls={false}
                    className="content-video"
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      )}
      {isDetailOpen && <PostDetail postId={selectedPostId} onClose={handleModalClose} />}
    </div>
  );
};

export default PostList;
