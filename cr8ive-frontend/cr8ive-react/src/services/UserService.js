import axios from "axios";

const hostname = 'http://localhost:8080';

const getUser = async (name) => {
    const response = await axios.get(`${hostname}/users/${name}`);
    const users = response.data;
    return users;
  };
  
  export default {
    getUser
  }