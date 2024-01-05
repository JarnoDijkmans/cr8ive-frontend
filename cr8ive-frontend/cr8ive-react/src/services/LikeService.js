import axiosInstance from './AxiosInstance';

const hostname = 'http://localhost:8080';

async function updateLikes(postId, userId, liked){
    try{
        const response = await axiosInstance.post (`${hostname}/api/likes` ,{
            postId: postId,
            userId: userId,
            liked: liked
        });
        return response.data
    }catch (error){
        throw error;
    }
}

async function getLikedPosts(userId, postId){
    try{
        const response = await axiosInstance.get(`${hostname}/api/likes/${userId}/${postId}`);
        return response.data
    }catch(error){
        throw error;
    }
}


export default {
    updateLikes,
    getLikedPosts
};