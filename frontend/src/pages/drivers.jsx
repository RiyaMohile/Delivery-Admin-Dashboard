import { useState } from "react";
import Sidebar from "../components/sidebar";
import { mockDrivers } from "../data/mockData";
import DriverDetailModal from "../components/driverDetails";
import { FaTruck } from "react-icons/fa";

const Drivers = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);

  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 bg-gray-100 min-h-screen p-4 sm:p-6 pt-16 md:pt-6 overflow-hidden">

          {/* HEADER */}
          <h1 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
            <FaTruck /> Drivers
          </h1>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow">
  <div className="max-h-[60vh] overflow-y-auto overflow-x-auto scrollbar-hide">
        <table className="min-w-[800px] w-full text-sm border-collapse">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="p-4 text-left w-16">#</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Vehicle</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {mockDrivers.map((d, index) => (
                  <tr key={d.id} className="hover:bg-blue-50 transition">
                    <td className="p-4 text-gray-500">{index + 1}</td>
                    <td className="p-4 font-medium">{d.name}</td>
                    <td className="p-4">{d.phone}</td>
                    <td className="p-4">{d.vehicleType}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${d.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedDriver(d)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>

      <DriverDetailModal
        driver={selectedDriver}
        onClose={() => setSelectedDriver(null)}
      />
    </>
  );
};


export default Drivers;
