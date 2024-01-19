import { useState } from "react"
import postService from "../services/PostService";
import DescriptionInput from '../components/DescriptionInput';
import HashtagsInput from '../components/HashtagInput';
import ContentInput from '../components/ContentInput';
import '../styles/CreatePostStyle.css';
import Message from '../components/Message';


const CreatePostPage = ({ userId }) => {
    const [newPost, setNewPost] = useState({
        content: [],
        description: '',
        hashtagIds: [],
      });
      const [message, setMessage] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();
         
        const newPostData = {
            content: newPost.content,
            description: newPost.description,
            hashtagIds: newPost.hashtagIds,
            userId: userId,
          };
      
        postService
          .savePost(newPostData)
          .then(() => {
            setMessage({ isSuccess: true, text: "Created post successfully!" });
            window.location.href = '/YourPage';
          })
          .catch((error) => {
            console.error('Error creating post:', error);
            setMessage({ isSuccess: false, text: "Something went wrong!" });
          });
      };

      const handleInputChange = (name, value) => {
        if (name === 'content') {
        setNewPost(() => ({
          content: value 
        }));
        
       }else {
          setNewPost((prevPost) => ({
            ...prevPost,
            [name]: value
          }));
        }
      };

    return (
        <div className="form">
          <h2>Create a new post</h2>
          <form onSubmit={handleSubmit}>
            <ContentInput
              name="content"
              value={newPost.content}
              updateFiles={handleInputChange}
            />
            <DescriptionInput
              name="description"
              value={newPost.description}
              handleInputChange={handleInputChange}
            />
    
            <HashtagsInput
                name="hashtagIds"
                value={newPost.hashtagIds}
                handleInputChange={handleInputChange}
            />
            <div>
              <button type="submit">Create Post</button>
              <div>
                    {message && (
                        <Message isSuccess={message.isSuccess} message={message.text} />
                    )}
              </div>
            </div>
          </form>
        </div>
      );
}

export default CreatePostPage;