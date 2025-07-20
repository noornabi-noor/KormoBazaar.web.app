import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const TopWorkers = () => {
  const axiosSecure = useAxiosSecure();
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/top-workers")
      .then((res) => setWorkers(res.data || []))
      .catch(() => console.error("Failed to fetch workers"));
  }, [axiosSecure]);

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">🏆 Top Workers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {workers.map((worker) => (
            <div
              key={worker.email}
              className="bg-white shadow rounded-lg p-4 text-center"
            >
              <img
                src={worker.photoURL}
                alt={worker.name}
                className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
              />
              <h3 className="text-lg font-semibold">{worker.name || "Unnamed"}</h3>
              <p className="text-gray-600">{worker.email}</p>
              <p className="mt-2 text-blue-600 font-bold">
                🪙 {worker.coins} Coins
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopWorkers;