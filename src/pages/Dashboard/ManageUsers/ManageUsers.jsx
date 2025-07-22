import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // 🔁 Debounced search value
  const debouncedSearch = useMemo(() => {
    return debounce((value, fn) => fn(value), 300);
  }, []);

  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["searchUsers", search],
    enabled: !!search,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/searchUsers?query=${search}`);
      return res.data || [];
    },
  });

  // 🔧 Input handler with debounce and manual refetch
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value, () => refetch());
  };

  const handleRoleToggle = async (email, currentRole) => {
    const newRole = currentRole === "admin" ? "worker" : "admin";
    try {
      const res = await axiosSecure.patch(`/admin/updateUserRole/${email}`, { role: newRole });

      if (res.data.modifiedCount > 0) {
        toast.success(`✅ ${email} is now ${newRole}`);
        refetch(); // Refresh user list
      }
    } catch {
      toast.error("❌ Failed to update role");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl transition-colors duration-300 shadow space-y-10">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-gradient dark:text-blue-300">🛠️ Manage Users</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Search and assign roles with confidence</p>
      </div>

      {/* Search Input */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full md:w-3/4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Table or Message */}
      <div>
        {isLoading ? (
          <p className="text-center mt-6 text-gray-500 dark:text-gray-400">Searching users...</p>
        ) : users.length === 0 ? (
          <p className="text-center mt-6 text-gray-500 dark:text-gray-400">No users found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="table w-full text-sm">
              <thead className="bg-blue-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-100">
                {users.map((user) => (
                  <tr key={user.email} className="hover:bg-sky-50 dark:hover:bg-gray-800 transition">
                    <td>{user.name || "—"}</td>
                    <td>{user.email}</td>
                    <td>{user.role || "worker"}</td>
                    <td>
                      <button
                        className={`btn btn-sm ${
                          user.role === "admin" ? "btn-error" : "btn-success"
                        }`}
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
    </div>
  );
};

export default ManageUsers;