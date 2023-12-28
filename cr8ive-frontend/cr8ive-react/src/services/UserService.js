import axios from 'axios';
import axiosInstance from './AxiosInstance';

const hostname = 'http://localhost:8080';

const getUserByName = async (name) => {
  try {
    const response = await axiosInstance.get(`${hostname}/users/${name}`);
    const users = response.data.users;
    for (let user of users){
      if (user.profilePicture != null) {
        user.profilePicture = await fetchAndUpdateFiles(user.id, user.profilePicture)
        }
    }
    return users;
  } catch (error) {
      console.error(error);
    throw error;
  }
};

const getUserById = async (id) => {
  const response= await axiosInstance.get(`${hostname}/users/byId/${id}`)
  const user  = response.data;
  if (user.profilePicture != null) {
    user.profilePicture = await fetchAndUpdateFiles(user.id, user.profilePicture)
  }
  return user;
};

const fetchAndUpdateFiles = async (userId, profilePicture) => {
  try {
    const fileResponse = await axiosInstance.get(`${hostname}/api/files/user/${userId}/${profilePicture}`, { responseType: 'blob' });

    const blob = new Blob([fileResponse.data]);
    const objectURL = URL.createObjectURL(blob);
    profilePicture = objectURL;
  
  } catch (error) {
    console.error(`Failed to retrieve file: ${profilePicture}`);
  }
  return profilePicture;
}

async function saveUser(newUser) {
  const formData = createUserFormData(newUser);
  try {
    const response = await axios.post(`${hostname}/users/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("Response: ", response)
    console.log("ResponseData: ", response.data)
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

function createUserFormData(newUser) {
  const formData = new FormData();
  formData.append('firstName', newUser.firstName)
  formData.append('lastName', newUser.lastName);
  formData.append('emailAddress', newUser.emailAddress);
  formData.append('birthdate', newUser.birthdate)
  formData.append('password', newUser.password);
  if (newUser.profilePicture) {
    formData.append('profilePicture', newUser.profilePicture);
  }
  else { formData.append ('profilePicture', null)};
  return formData;
}


export default {
  getUserByName,
  getUserById,
  saveUser,
};