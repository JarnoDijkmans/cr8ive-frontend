import axios from "axios";

const hostname = 'http://localhost:8080';

function createPostFormData(newPost) {
    const formData = new FormData();
  
    newPost.content.forEach((file) => {
      formData.append('content', file);
    });
  
    formData.append('description', newPost.description);
  
    newPost.hashtagIds.forEach((hashtagId) => {
      formData.append('hashtagIds', hashtagId);
    });
  
    formData.append('userId', newPost.userId);
  
    return formData;
  }

function savePost(newPost) {
  const formData = createPostFormData(newPost);
  console.log(formData);

  return axios.post(`${hostname}/posts`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating post:', error);
      throw error; 
    });
}

export default {
  createPostFormData,
  savePost
};