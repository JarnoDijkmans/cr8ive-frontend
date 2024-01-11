import React, { useEffect, useState } from "react";
import PostService from "../services/PostService";
import LocalStorageService from "../services/LocalStorageService";
import { useJwt } from 'react-jwt';
import './styles/PostDetail.css'; 
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const PostDetail = ({ postId, onClose }) => {
 const [post, setPost] = useState(null);
 const [isOpen, setIsOpen] = useState(false);
 const [isEdit, setIsEdit] = useState(false); 
 const [editedDescription, setEditedDescription] = useState('');
 const token = LocalStorageService.get();
 const { decodedToken} = useJwt(token || null);

 const deletePost = () => {
   PostService.deletePost(postId)
        .then(() => {
            window.location.href = '/YourPage';
        })
        .catch((error) => {
            console.error('Error creating post:', error);
          });
    }

    const editPost = () => {
      setIsEdit(true);
      setEditedDescription(post.description);
    };

    const saveEditedPost = () => {
      PostService.updatePostDescription(postId, editedDescription)
        .then((response) => {
          setIsEdit(false);
          post.description = response;
        })
        .catch((error) => {
          console.error('Error updating post description:', error);
        });
    };

 useEffect(() => {
    PostService.getPost(postId)
      .then((response) => {
        setPost(response);
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });

      if (decodedToken) {
        console.log("roles:", decodedToken.roles)
      }
   }, [postId, decodedToken, post]);
  
   return post ? (
    <div className="post-detail-overlay">
      <div className="post-detail-content">
          <div className="edit-description-box">
          {isEdit ? (
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Edit description..."
            />
          ) : (
            <div>
              <h3>{post.creationDate}</h3>
              <p>{post.description}</p>
            </div>
          )}
        </div>
        <Carousel>
          {post.content.map((content, index) => {
            const isImage = content.type.startsWith('image/');
            const isVideo = content.type.startsWith('video/');
  
            return isImage ? (
              <div key={index}>
                <img src={content.url} alt={`Post Content ${index}`} className="post-media-image" />
              </div>
            ) : isVideo ? (
              <div key={index}>
                <video controls>
                 <source src={content.url} type={content.type} className="post-media-video"/>
                </video>
              </div>
            ) : null;
          })}
        </Carousel>
        <button className="options" onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
        {isOpen && decodedToken && (
          <div className="additional-actions">
            {(post.userId === decodedToken.userId || decodedToken.roles.includes('MODERATOR')) && (
              <button onClick={deletePost}>Delete Post</button>
            )}
            {(post.userId === decodedToken.userId) && (
              <div>
                {isEdit ? (
                  <button onClick={saveEditedPost}>Save</button>
                ) : (
                  <button onClick={editPost}>Edit Post</button>
                )}
              </div>
            )}
          </div>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null;
};

export default PostDetail;