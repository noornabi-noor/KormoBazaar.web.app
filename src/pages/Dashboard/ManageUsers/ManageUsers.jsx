import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

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
        refetch();
      }
    } catch {
      toast.error("❌ Failed to update role");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-lg md:rounded-2xl transition-colors duration-300 shadow space-y-6 md:space-y-10">
      {/* Header */}
      <div className="text-center px-2">
        <h2 className="text-2xl sm:text-3xl font-bold">
          🛠️<span className="text-primary-gradient dark:text-blue-300">Manage Users</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
          Search and assign roles with confidence
        </p>
      </div>

      {/* Search Input */}
      <div className="px-2 sm:px-0">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* User List */}
      <div className="px-2 sm:px-0">
        {isLoading ? (
          <div className="text-center py-8">
            <span className="loading loading-spinner text-primary"></span>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Searching users...</p>
          </div>
        ) : users.length === 0 ? (
          <p className="text-center py-8 text-gray-500 dark:text-gray-400">
            {search ? "No users found" : "Search for users to manage"}
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            {/* Desktop Table */}
            <div className="hidden sm:block">
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
                      <td className="break-all">{user.email}</td>
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

            {/* Mobile Cards */}
            <div className="sm:hidden space-y-3 p-2">
              {users.map((user) => (
                <div
                  key={user.email}
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">
                        {user.name || "No name"}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 break-all">
                        {user.email}
                      </p>
                    </div>
                    <span className="badge badge-sm">
                      {user.role || "worker"}
                    </span>
                  </div>
                  <div className="mt-3">
                    <button
                      className={`btn btn-xs w-full ${
                        user.role === "admin" ? "btn-error" : "btn-success"
                      }`}
                      onClick={() => handleRoleToggle(user.email, user.role)}
                    >
                      {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;