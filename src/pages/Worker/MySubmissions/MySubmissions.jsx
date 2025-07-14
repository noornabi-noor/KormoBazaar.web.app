import React, { useEffect, useState } from "react";
import UseAuth from "../../../hooks/UseAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MySubmissions = () => {
  const { user } = UseAuth();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/my-submissions/${user.email}`)
        .then((res) => res.json())
        .then((data) => setSubmissions(data))
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [user?.email]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📬 My Submissions</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Buyer</th>
              <th>Pay</th>
              <th>Date</th>
              <th>Submission</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s._id}>
                <td>{s.task_title}</td>
                <td>{s.buyer_name} ({s.buyer_email})</td>
                <td>${s.payable_amount}</td>
                <td>{new Date(s.current_date).toLocaleDateString()}</td>
                <td>{s.submission_details}</td>
                <td>
                  <span
                    className={`badge ${
                      s.status === "approved"
                        ? "badge-success"
                        : s.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {submissions.length === 0 && <p>No submissions found.</p>}
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default MySubmissions;