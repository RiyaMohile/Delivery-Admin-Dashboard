import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import api from "../services/api";
import { mockUsers, mockDrivers, mockOrders } from "../data/mockData";

// ICONS
import {
  FaUsers,
  FaTruck,
  FaShoppingCart,
  FaBoxOpen,
} from "react-icons/fa";

// CHARTS
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    api.get("/product").then(res => setProductCount(res.data.length));
  }, []);

  const cards = [
    {
      title: "Users",
      value: mockUsers.length,
      icon: <FaUsers size={26} />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Drivers",
      value: mockDrivers.length,
      icon: <FaTruck size={26} />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Orders",
      value: mockOrders.length,
      icon: <FaShoppingCart size={26} />,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Products",
      value: productCount,
      icon: <FaBoxOpen size={26} />,
      color: "from-orange-500 to-orange-700",
    },
  ];

  const stats = cards.map(c => ({ name: c.title, value: c.value }));

  const orderStatusData = [
    { name: "Delivered", value: mockOrders.filter(o => o.status === "Delivered").length },
    { name: "Pending", value: mockOrders.filter(o => o.status === "Pending").length },
    { name: "Cancelled", value: mockOrders.filter(o => o.status === "Cancelled").length },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="flex">
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-100 min-h-screen p-4 sm:p-6 pt-16 md:pt-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">
          Dashboard
        </h1>

        {/* ===== RESPONSIVE CARDS ===== */}
        <div className="
          grid gap-6 mb-8
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
        ">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`
                bg-gradient-to-r ${card.color}
                text-white p-5 rounded-xl shadow-lg
                flex items-center justify-between
                transition hover:scale-[1.02]
              `}
            >
              <div>
                <h3 className="text-sm opacity-80">
                  {card.title}
                </h3>
                <p className="text-2xl sm:text-3xl font-bold">
                  {card.value}
                </p>
              </div>

              <div className="bg-white/20 p-3 rounded-full">
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* ===== RESPONSIVE CHARTS ===== */}
        <div className="
          grid gap-6
          grid-cols-1
          lg:grid-cols-2
        ">
          {/* BAR CHART */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-4">
              Overall Count
            </h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={stats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* PIE CHART */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-4">
              Order Status
            </h2>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {orderStatusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
