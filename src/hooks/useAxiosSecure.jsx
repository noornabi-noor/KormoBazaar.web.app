import axios from "axios";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
  baseURL: `https://kormobazaar-server.vercel.app`,
});

const useAxiosSecure = () => {
  const { user } = UseAuth();

  axiosSecure.interceptors.request.use(
    async (config) => {
      if (user) {
        const token = await user.getIdToken(); 
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosSecure;
};

export default useAxiosSecure;