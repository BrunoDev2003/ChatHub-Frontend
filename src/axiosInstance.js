import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/login',
    withCredentials: true,
});

export default axiosInstance;