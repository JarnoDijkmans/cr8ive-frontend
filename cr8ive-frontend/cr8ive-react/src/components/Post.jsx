import { Carousel } from 'react-responsive-carousel';
import './styles/Post.css'

const Post = ({ post, handlePostView }) => {
    return (
        <div className='post-container'>
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
    );
};

export default Post;