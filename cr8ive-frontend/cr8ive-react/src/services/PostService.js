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

const getUserPosts = async (userId) => {
  const response = await axios.get(`${hostname}/posts/${userId}`);
  const posts = response.data;

  for (let post of posts) {
    if (post.content && post.content.length > 0) {
      const updatedContent = [];
      for (let content of post.content) {
        try {
          const fileResponse = await axios.get(`${hostname}/api/files/${post.id}/${content.url}`, { responseType: 'blob' });

          const blob = new Blob([fileResponse.data], { type: content.type });
          const objectURL = URL.createObjectURL(blob);

          const updatedContentItem = {
            url: objectURL,
            type: content.type,
          };

          updatedContent.push(updatedContentItem);
        } catch (error) {
          console.error(`Failed to retrieve file: ${content.url}`);
        }
      }

      post.content = updatedContent;
    }
  }

  return posts;
};

export default {
  createPostFormData,
  savePost,
  getUserPosts
};