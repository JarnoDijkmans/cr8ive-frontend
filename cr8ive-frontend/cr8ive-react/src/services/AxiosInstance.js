import axios from 'axios';
import LocalStorageService from './LocalStorageService';
import { isExpired } from 'react-jwt';


const baseURL = 'http://localhost:8080';


const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = LocalStorageService.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //TODO
    if (isExpired(LocalStorageService.get())) {
    LocalStorageService.remove();
    window.location.href = '/';
    return Promise.reject(error);
    }
  }
);

export default axiosInstance;