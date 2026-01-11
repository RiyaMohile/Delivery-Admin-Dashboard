import { FaTimes, FaUser } from "react-icons/fa";

const UserDetailModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">

        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <FaTimes />
        </button>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <FaUser /> User Details
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Name</span>
            <span className="font-medium">{user.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{user.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Phone</span>
            <span className="font-medium">{user.phone}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Address</span>
            <span className="font-medium">{user.address}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {user.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
