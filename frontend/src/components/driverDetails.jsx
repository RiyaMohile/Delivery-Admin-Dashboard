import { FaTimes, FaTruck } from "react-icons/fa";

const DriverDetailModal = ({ driver, onClose }) => {
  if (!driver) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FaTimes />
        </button>

        {/* HEADER */}
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <FaTruck /> Driver Details
        </h2>

        {/* DETAILS */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Name</span>
            <span className="font-medium">{driver.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Phone</span>
            <span className="font-medium">{driver.phone}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">
              {driver.email || "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Vehicle Type</span>
            <span className="font-medium">{driver.vehicleType}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Vehicle Number</span>
            <span className="font-medium">{driver.vehicleNumber}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">License Number</span>
            <span className="font-medium">{driver.licenseNumber}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status</span>
            <span
              className={`
                px-3 py-1 rounded-full text-xs font-semibold
                ${
                  driver.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {driver.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailModal;
