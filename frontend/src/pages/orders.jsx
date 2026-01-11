import { useState } from "react";
import Sidebar from "../components/sidebar";
import { mockOrders } from "../data/mockData";
import OrderDetailModal from "../components/orderDetails";
import { FaShoppingCart } from "react-icons/fa";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 bg-gray-100 min-h-screen p-4 sm:p-6 pt-16 md:pt-6 overflow-hidden">

          <h1 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
            <FaShoppingCart /> Orders
          </h1>

          <div className="bg-white rounded-xl shadow">
            <div className="max-h-[60vh] overflow-y-auto overflow-x-auto scrollbar-hide">
              <table className="min-w-[800px] w-full text-sm border-collapse">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="p-4 w-16">#</th>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">User</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {mockOrders.map((o, index) => (
                    <tr key={o.id} className="hover:bg-blue-50 transition">
                      <td className="p-4 text-gray-500">{index + 1}</td>
                      <td className="p-4 font-medium">{o.id}</td>
                      <td className="p-4">{o.userName}</td>
                      <td className="p-4 font-semibold">₹{o.amount}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${o.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : o.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setSelectedOrder(o)}
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

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};


export default Orders;
