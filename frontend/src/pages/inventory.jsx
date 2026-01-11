import { useState } from "react";
import Sidebar from "../components/sidebar";
import CategoryTab from "../components/inventory/categoryTab";
import SubCategoryTab from "../components/inventory/subCategoryTab";
import ProductTab from "../components/inventory/productTab";

import { FaList, FaLayerGroup, FaBox } from "react-icons/fa";

const Inventory = () => {
  const [tab, setTab] = useState("category");

  const tabs = [
    { key: "category", label: "Category", icon: <FaList /> },
    { key: "subcategory", label: "Sub-Category", icon: <FaLayerGroup /> },
    { key: "product", label: "Product", icon: <FaBox /> },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 h-screen overflow-hidden p-4 sm:p-6 pt-16 md:pt-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">
          Inventory Management
        </h1>

        <div
          className="flex flex-col sm:flex-row gap-3 mb-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition justify-center sm:justify-start w-full sm:w-auto
                ${tab === t.key ? "bg-yellow-500 text-white shadow" : "bg-white text-gray-700 hover:bg-yellow-50"}`}>
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow h-[calc(100vh-220px)] overflow-hidden">
          {tab === "category" && <CategoryTab />}
          {tab === "subcategory" && <SubCategoryTab />}
          {tab === "product" && <ProductTab />}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
