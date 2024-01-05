import { useState, useEffect, useCallback } from 'react';
import LocalStorageService from '../services/LocalStorageService';
import { useJwt } from 'react-jwt';
import { Carousel } from 'react-responsive-carousel';
import userService from '../services/UserService';
import likeService from '../services/LikeService'
import LikeButton from '../components/LikeButton';
import './styles/Post.css'

const Post = ({ post, handlePostView }) => {
  
  const [user, setUser] = useState(null);
  const token = LocalStorageService.get();
  const { decodedToken} = useJwt(token || null);
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    userService.getUserById(post.userId).then((response) => { setUser(response);
    }).catch((error) => {
      console.error("Error fetching post details: ", error);
    })
  }, [post.userId]);

  useEffect(() => {
    if (decodedToken) {
      const userId = decodedToken.userId;
      likeService.getLikedPosts(userId, post.id)
        .then((response) => { setLiked(response); })
        .catch((error) => {
          console.error("Something went wrong with getting liked posts", error);
        });
    }
  }, [decodedToken]);
  

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    if (newLiked) {
      likeService.updateLikes(post.id, post.userId, newLiked).then((response) => {
        post.likes = response.likeCount;
      });
    } else {
      likeService.updateLikes(post.id, post.userId, newLiked).then((response) => {
        post.likes = response.likeCount;
      });
    }
   };
  
  return (
        <div className='post-container'>
           <div className='media-section'>
              <div id={`post-${post.id}`} onClick={() => handlePostView(post.id)}>
                <Carousel showThumbs={post.content.length > 1} className="carousel-container">
                  {post.content.map((content, index) => {
                    const isImage = content.type.startsWith('image/');
                    const isVideo = content.type.startsWith('video/');
        
                    return isImage ? (
                      <div key={index}>
                        <img src={content.url} alt={`Post Content ${index}`} className="post-media-image" />
                      </div>
                    ) : isVideo ? (
                      <div key={index}>
                        <video controls className="post-media-video">
                          <source src={content.url} type={content.type} />
                        </video>
                      </div>
                    ) : null;
                  })}
                </Carousel>
          </div>
        </div>
        <div className='info-section'>
        <div className='user-info'>
            {user && (
                <>
                    <img src={user.profilePicture} alt={post.username} className='profile-picture-Post'/>
                    <p>{user.firstName}{user.lastName}</p>
                </>
            )}
        </div>
        <div className='post-info'>
          <p>{post.description}</p>
        </div>
            <div className='interaction-section'>
            <LikeButton onClick={handleLike} liked={liked} />
            <p>{post.likes}</p>
            </div>
        </div>
      </div>
    );
};

export default Post;