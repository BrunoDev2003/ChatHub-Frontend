import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://www.chatshubapp.it.com/api',
    withCredentials: true,
});

export default axiosInstance;