import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import debounce from "lodash.debounce"; // install with: npm install lodash.debounce
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = debounce(async () => {
      if (!search) return setUsers([]);

      try {
        const res = await axiosSecure.get(`/admin/searchUsers?query=${search}`);
        setUsers(res.data || []);
      } catch (err) {
        toast.error("❌ Failed to fetch users");
      }
    }, 300); // debounce delay

    fetchUsers();

    return () => fetchUsers.cancel(); // cleanup on unmount
  }, [search, axiosSecure]);

  const handleRoleToggle = async (email, currentRole) => {
    const newRole = currentRole === "admin" ? "worker" : "admin";

    try {
      const res = await axiosSecure.patch(`/admin/updateUserRole/${email}`, { role: newRole });

      if (res.data.modifiedCount > 0) {
        toast.success(`✅ ${email} is now ${newRole}`);
        setUsers(users.map(u => u.email === email ? { ...u, role: newRole } : u));
      }
    } catch (err) {
      toast.error("❌ Failed to update role");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🛠️ Manage Users</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        className="input input-bordered w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>{user.name || "—"}</td>
                  <td>{user.email}</td>
                  <td>{user.role || "worker"}</td>
                  <td>
                    <button
                      className={`btn btn-sm ${user.role === "admin" ? "btn-error" : "btn-success"}`}
                      onClick={() => handleRoleToggle(user.email, user.role)}
                    >
                      {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;