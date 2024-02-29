// axios-client.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_PUBLIC_API}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to handle token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
