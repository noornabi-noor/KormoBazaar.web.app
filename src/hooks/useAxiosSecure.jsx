// import axios from "axios";
// import UseAuth from "./UseAuth";

// const axiosSecure = axios.create({
//   baseURL: `https://kormobazaar-server.vercel.app`,
// });

// const useAxiosSecure = () => {
//   const { user } = UseAuth();

//   axiosSecure.interceptors.request.use(
//     async (config) => {
//       if (user) {
//         const token = await user.getIdToken(); 
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return axiosSecure;
// };

// export default useAxiosSecure;



import axios from "axios";
import { useEffect } from "react";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
  baseURL: `https://kormobazaar-server.vercel.app`,
});

let interceptorAttached = false;

const useAxiosSecure = () => {
  const { user } = UseAuth();

  useEffect(() => {
    if (!interceptorAttached && user) {
      axiosSecure.interceptors.request.use(
        async (config) => {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
        (error) => Promise.reject(error)
      );
      interceptorAttached = true;
    }
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
