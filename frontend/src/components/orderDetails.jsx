import { FaTimes, FaShoppingCart } from "react-icons/fa";

const OrderDetailModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <FaShoppingCart /> Order Details
        </h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium">{order.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Payment</span>
            <span className="font-medium">{order.paymentMethod}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Total Amount</span>
            <span className="font-semibold">₹{order.amount}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold${order.status === "Delivered" ? "bg-green-100 text-green-700" : order.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
              {order.status}
            </span>
          </div>
        </div>

        <hr className="my-4" />

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Customer</h3>
          <p className="text-sm text-gray-700">{order.userName}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Items</h3>
          <ul className="space-y-1 text-sm">
            {order.items.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span className="font-medium">
                  ₹{item.price * item.qty}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
