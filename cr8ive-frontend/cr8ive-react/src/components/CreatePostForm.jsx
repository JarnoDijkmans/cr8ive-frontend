import React, { useState } from 'react';
import axios from 'axios';
import DescriptionInput from '../components/descriptionInput';
import HashtagsInput from '../components/hashtagInput';
import ContentInput from '../components/contentInput';
import '../styles/CreatePostStyle.css';

function CreatePostForm() {
  const [newPost, setNewPost] = useState({
    content: [],
    description: '',
    hashtagIds: [],
    userId: 1,
  });

  const [selectedHashtags, setSelectedHashtags] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const handleFileInput = (files) => {
    setNewPost({ ...newPost, content: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedHashtagIds = selectedHashtags.map((option) => option.value);

    try {
      const formData = new FormData();
      newPost.content.forEach(file => {
        formData.append('content', file.file);
      });
      formData.append('description', newPost.description);
      formData.append('hashtagIds', selectedHashtagIds);
      formData.append('userId', newPost.userId);
    
      const response = await axios.post('http://localhost:8080/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      console.log('Post created successfully:', response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="form">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <ContentInput
          handleFileInput={handleFileInput} 
        />
        <DescriptionInput
          value={newPost.description}
          handleInputChange={handleInputChange}
        />

        <HashtagsInput
          value={selectedHashtags}
          handleOnChange={(selectedOptions) => {
            setSelectedHashtags(selectedOptions);
          }}
        />
        <div>
          <button type="submit">Create Post</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostForm;
