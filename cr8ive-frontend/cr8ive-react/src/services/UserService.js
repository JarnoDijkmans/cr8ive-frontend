import axios from "axios";

const hostname = 'http://localhost:8080';

const getUserByName = async (name) => {
    const response = await axios.get(`${hostname}/users/${name}`);
    const users = response.data;
    return users;
  };

const getUserById = async (id) => {
  const response= await axios.get(`${hostname}/users/byId/${id}`)
  const { user } = response.data;
  if (user.profilePicture != null) {
    try {
      const fileResponse = await axios.get(`${hostname}/api/files/user/${user.id}/${user.profilePicture}`, { responseType: 'blob' });

      const blob = new Blob([fileResponse.data]);
      const objectURL = URL.createObjectURL(blob);
      user.profilePicture = objectURL;
    
    } catch (error) {
      console.error(`Failed to retrieve file: ${user.profilePicture}`);
    }
  }
  return user;
};

  
export default {
    getUserByName,
    getUserById
}