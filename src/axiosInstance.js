import axios from 'axios';
import { backendUrl } from './App';

const axiosInstance = axios.create({
    baseURL: `http://${backendUrl}/api`,
    withCredentials: true,
});

export default axiosInstance;