import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const CategoryTab = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <input
          type="text"
          placeholder="Search Category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full sm:w-40 border rounded-lg px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
            <FaPlus />
            Add Category
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Category Name</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((item) => (
                <tr key={item} className="border-t">
                  <td className="px-4 py-3">{item}</td>
                  <td className="px-4 py-3">Sample Category {item}</td>
                  <td className="px-4 py-3">
                    <span className="text-green-600 font-medium">Active</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryTab;
