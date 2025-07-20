// hooks/useRole.js
import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';
import UseAuth from './UseAuth';


const useRole = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/role/${user.email}`)
        .then(res => {
          setRole(res.data.role);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  return [role, loading];
};

export default useRole;
