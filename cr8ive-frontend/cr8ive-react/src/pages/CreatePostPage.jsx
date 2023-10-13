import { useState } from "react"
import postService from "../services/PostService";
import DescriptionInput from '../components/DescriptionInput';
import HashtagsInput from '../components/HashtagInput';
import ContentInput from '../components/ContentInput';
import '../styles/CreatePostStyle.css';


function CreatePostPage(){
    const [newPost, setNewPost] = useState({
        content: [],
        description: '',
        hashtagIds: [],
        userId: 1,
      });


    const handleSubmit = (e) => {
        e.preventDefault();
         
        const newPostData = {
            content: newPost.content,
            description: newPost.description,
            hashtagIds: newPost.hashtagIds,
            userId: newPost.userId,
          };
      
        postService
          .savePost(newPostData)
          .then((response) => {
            console.log('Post created successfully:', response);
          })
          .catch((error) => {
            console.error('Error creating post:', error);
          });
      };

      const handleInputChange = (name, value) => {
        
        setNewPost((prevPost) => ({
          ...prevPost,
          [name]: value
        }))
      };

    return (
        <div className="form">
          <h2>Create a New Post</h2>
          <form onSubmit={handleSubmit}>
            <ContentInput 
              addItem={handleInputChange}
              name="content"
              value={newPost.content}
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
            </div>
          </form>
        </div>
      );
}

export default CreatePostPage;