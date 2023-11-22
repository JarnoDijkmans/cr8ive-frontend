import axios from "axios";

const hostname = 'http://localhost:8080';

function login(email, password) {
    return axios.post(`${hostname}/tokens`, {
        emailAddress: email,
        password: password
    })
    .then(response => {
        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data.accessToken;
    })
 };

export default {
    login
};
