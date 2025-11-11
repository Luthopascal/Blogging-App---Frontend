// src/lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1/auth', // use your API root
  // timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

