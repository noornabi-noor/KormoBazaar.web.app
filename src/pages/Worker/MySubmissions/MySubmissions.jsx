// import React, { useEffect, useState } from "react";
// import UseAuth from "../../../hooks/UseAuth";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const MySubmissions = () => {
//   const { user } = UseAuth();
//   const [submissions, setSubmissions] = useState([]);

//   useEffect(() => {
//     if (user?.email) {
//       fetch(`http://localhost:5000/my-submissions/${user.email}`)
//         .then((res) => res.json())
//         .then((data) => setSubmissions(data))
//         .catch((err) => console.error("Fetch error:", err));
//     }
//   }, [user?.email]);

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow transition-colors duration-300 space-y-8">
//       {/* Header */}
//       <div className="text-center">
//         <h2 className="text-3xl font-bold text-primary-gradient dark:text-blue-300">📬 My Submissions</h2>
//         <p className="text-gray-600 dark:text-gray-400 mt-1">Track your submission status and details</p>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
//         {submissions.length > 0 ? (
//           <table className="table w-full text-sm">
//             <thead className="bg-blue-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
//               <tr>
//                 <th>Task Title</th>
//                 <th>Buyer</th>
//                 <th>Pay</th>
//                 <th>Date</th>
//                 <th>Submission</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-700 dark:text-gray-100">
//               {submissions.map((s) => (
//                 <tr key={s._id} className="hover:bg-sky-50 dark:hover:bg-gray-800 transition">
//                   <td>{s.task_title}</td>
//                   <td>
//                     {s.buyer_name} <br />
//                     <span className="text-xs text-gray-500 dark:text-gray-400">{s.buyer_email}</span>
//                   </td>
//                   <td>${s.payable_amount}</td>
//                   <td>{new Date(s.current_date).toLocaleDateString()}</td>
//                   <td>{s.submission_details}</td>
//                   <td>
//                     <span
//                       className={`badge px-3 py-1 text-xs font-semibold ${
//                         s.status === "approved"
//                           ? "badge-success text-green-700 dark:text-green-300"
//                           : s.status === "rejected"
//                           ? "badge-error text-red-700 dark:text-red-300"
//                           : "badge-warning text-yellow-700 dark:text-yellow-300"
//                       }`}
//                     >
//                       {s.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-center text-gray-500 dark:text-gray-400">No submissions found.</p>
//         )}
//       </div>

//       <ToastContainer position="top-center" />
//     </div>
//   );
// };

// export default MySubmissions;



import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MySubmissions = () => {
  const { user } = UseAuth();

  const {
    data: submissions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mySubmissions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/my-submissions/${user.email}`);
      if (!res.ok) throw new Error("Failed to fetch submissions");
      return res.json();
    },
  });

  if (error) {
    toast.error("❌ Failed to load submissions");
  }

  if (isLoading) {
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading your submissions...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow transition-colors duration-300 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-gradient dark:text-blue-300">
          📬 My Submissions
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Track your submission status and details
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        {submissions.length > 0 ? (
          <table className="table w-full text-sm">
            <thead className="bg-blue-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <tr>
                <th>Task Title</th>
                <th>Buyer</th>
                <th>Pay</th>
                <th>Date</th>
                <th>Submission</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-100">
              {submissions.map((s) => (
                <tr key={s._id} className="hover:bg-sky-50 dark:hover:bg-gray-800 transition">
                  <td>{s.task_title}</td>
                  <td>
                    {s.buyer_name} <br />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{s.buyer_email}</span>
                  </td>
                  <td>${s.payable_amount}</td>
                  <td>{new Date(s.current_date).toLocaleDateString()}</td>
                  <td>{s.submission_details}</td>
                  <td>
                    <span
                      className={`badge px-3 py-1 text-xs font-semibold ${
                        s.status === "approved"
                          ? "badge-success text-green-700 dark:text-green-300"
                          : s.status === "rejected"
                          ? "badge-error text-red-700 dark:text-red-300"
                          : "badge-warning text-yellow-700 dark:text-yellow-300"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No submissions found.</p>
        )}
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default MySubmissions;