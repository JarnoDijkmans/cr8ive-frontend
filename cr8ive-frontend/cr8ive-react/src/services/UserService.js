import axiosInstance from './AxiosInstance';

const hostname = 'http://localhost:8080';

const getUserByName = async (name) => {
  try {
    const response = await axiosInstance.get(`${hostname}/users/${name}`);
    const users = response.data;
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`${hostname}/users/byId/${id}`);
    return response.data.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getUserByName,
  getUserById
};