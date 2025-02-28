import axios from 'axios';
import type { AxiosInstance } from 'axios';

const axiosInstance : AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default axiosInstance;