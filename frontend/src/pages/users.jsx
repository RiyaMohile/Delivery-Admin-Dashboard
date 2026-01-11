import { useState } from "react";
import Sidebar from "../components/sidebar";
import { mockUsers } from "../data/mockData";
import UserDetailModal from "../components/userDetails";
import { FaUser } from "react-icons/fa";

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <div className="flex">
        <Sidebar />

        {/* 🔴 IMPORTANT: stop page scroll */}
        <div className="flex-1 bg-gray-100 min-h-screen p-4 sm:p-6 pt-16 md:pt-6 overflow-hidden">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
              <FaUser /> Users
            </h1>
          </div>

          {/* USERS TABLE */}
          <div className="bg-white rounded-xl shadow">

            {/* ✅ TABLE SCROLL CONTAINER */}
            <div className="max-h-[60vh] overflow-y-auto overflow-x-auto scrollbar-hide">

              <table className="min-w-[700px] w-full text-sm border-collapse">
                <thead className="bg-gray-900 text-white sticky top-0">
                  <tr>
                    <th className="p-4 text-left w-16">#</th>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Phone</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {mockUsers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-12 text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    mockUsers.map((u, index) => (
                      <tr
                        key={u.id}
                        className="hover:bg-blue-50 transition"
                      >
                        <td className="p-4 text-gray-500 font-medium">
                          {index + 1}
                        </td>

                        <td className="p-4 font-medium text-gray-800">
                          {u.name}
                        </td>

                        <td className="p-4 text-gray-700">
                          {u.phone}
                        </td>

                        <td className="p-4">
                          <span
                            className={`
                              inline-flex items-center gap-2
                              px-3 py-1 rounded-full text-xs font-semibold
                              ${
                                u.status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }
                            `}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                u.status === "Active"
                                  ? "bg-green-600"
                                  : "bg-red-600"
                              }`}
                            />
                            {u.status}
                          </span>
                        </td>

                        <td className="p-4">
                          <button
                            onClick={() => setSelectedUser(u)}
                            className="text-blue-600 font-medium hover:underline"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>

      {/* USER DETAIL MODAL */}
      <UserDetailModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </>
  );
};

export default Users;
