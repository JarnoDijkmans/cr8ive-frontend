import axiosInstance from './AxiosInstance';

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

  return axiosInstance.post(`${hostname}/posts`, formData, {
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
  const response = await axiosInstance.get(`${hostname}/posts/${userId}`);
  const posts = response.data.post;

  for (let post of posts) {
    if (post.content && post.content.length > 0) {
      post.content = await fetchAndUpdateFiles(post.id, post.content)
    }
  }
  return posts;
};

const getPost = async (postId) => {
  const response = await axiosInstance.get(`${hostname}/posts/postId/${postId}`);
  const post = response.data.post;
    if (post.content && post.content.length > 0) {
      post.content = await fetchAndUpdateFiles(post.id, post.content)
    }
  return post;
};



const fetchAndUpdateFiles = async (postId, files) => {
  const updatedFiles = [];
  for (let file of files) {
    try {
      const fileResponse = await axiosInstance.get(`${hostname}/api/files/${postId}/${file.url}`, { responseType: 'blob' });
      const blob = new Blob([fileResponse.data], { type: file.type });
      const objectURL = URL.createObjectURL(blob);

      const updatedContentItem = {
        url: objectURL,
        type: file.type,
      };
      updatedFiles.push(updatedContentItem);
    } catch (error) {
      console.error(`Failed to retrieve file: ${file.fileUrl}`);
    }
  }
  return updatedFiles;
};

function deletePost(postId){
  return axiosInstance.delete(`${hostname}/posts/${postId}`)
}

const markPostAsSeenByUser = async(postId, userId) =>{
   return axiosInstance.post(`${hostname}/posts/markAsSeen/${postId}/${userId}`)
}

const getLatestPostsforUser = async(userId) => {
  const response = await axiosInstance.get(`${hostname}/posts/api/forUser/${userId}`);
  const posts = response.data.post;
  for (let post of posts) {
    if (post.content && post.content.length > 0) {
      post.content = await fetchAndUpdateFiles(post.id, post.content)
    }
  }
  return posts;
}

const getTrendingPosts = async() => {
  const response = await axiosInstance.get(`${hostname}/posts/api/trending`);
  const posts = response.data.post;
  for (let post of posts) {
    if (post.content && post.content.length > 0) {
      post.content = await fetchAndUpdateFiles(post.id, post.content)
    }
  }
  return posts;
}

const updatePostDescription = async(postId, description) => {
    const requestBody = {
      postId: postId,
      description: description
  };
    try {
      const response = await axiosInstance.post(`${hostname}/posts/update/description`, requestBody);
      return response.data;
    }catch (error) {
      throw error;
  } 
}



export default {
  createPostFormData,
  savePost,
  getUserPosts,
  getPost,
  deletePost,
  fetchAndUpdateFiles,
  markPostAsSeenByUser,
  getLatestPostsforUser,
  getTrendingPosts, 
  updatePostDescription
};