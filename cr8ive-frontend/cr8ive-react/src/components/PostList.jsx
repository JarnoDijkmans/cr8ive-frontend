import React from 'react';
import { useState, useEffect } from 'react';
import './styles/PostList.css'

const PostList = ({ posts }) => {
    const [selectedNavItem, setSelectedNavItem] = useState(null);

    useEffect(() => {
      }, [selectedNavItem]);
    
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
                {/* <div
                className={`nav-item ${selectedNavItem === 'AllPostHashtag' ? 'selected' : ''}`}
                onClick={() => handleNavItemClick('AllPostHashtag')}
                >
                All-Post-Hashtag
                </div> */}
            <div
                className={`nav-item ${selectedNavItem === 'CreateNewPost' ? 'selected' : ''}`}
                onClick={() => handleNavItemClick('CreateNewPost')}
                >
                Create-new-Post
            </div>
        </div>

     <div className="container-postlist">
        {posts.map((post, index) => {
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
    </div>
    );
    };
   
   export default PostList;