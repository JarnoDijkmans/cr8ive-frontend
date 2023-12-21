import axiosInstance from './AxiosInstance';

const hostname = 'http://localhost:8080';

const fetchMessages = async (receiverUserId) => {
    const response = await axiosInstance.get(`${hostname}/chat/${receiverUserId}`);
    return response.data
}

async function saveMessages(receiverUserId, message) {
    const requestBody = {
        receiverId: receiverUserId,
        content: message
    };
    try {
        const response = await axiosInstance.post(`${hostname}/chat/save`, requestBody);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default {
    fetchMessages,
    saveMessages
};