import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  },
);

export default axiosInstance;
