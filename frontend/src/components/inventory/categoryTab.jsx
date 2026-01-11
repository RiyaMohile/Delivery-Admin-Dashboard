import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  FaPlus,
  FaTags,
  FaTimes,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

const CategoryTab = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [editId, setEditId] = useState(null);

  // search & filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchData = async () => {
    const res = await api.get("/category");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // prevent background scroll when modal opens
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  // ADD / UPDATE CATEGORY
  const saveCategory = async () => {
    if (!name.trim()) return;

    setLoading(true);

    if (editId) {
      await api.put(`/category/${editId}`, { name, status });
    } else {
      await api.post("/category", { name, status });
    }

    setName("");
    setStatus("Active");
    setEditId(null);
    setOpen(false);
    setLoading(false);
    fetchData();
  };

  const openEdit = (cat) => {
    setEditId(cat._id);
    setName(cat.name);
    setStatus(cat.status);
    setOpen(true);
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await api.delete(`/category/${id}`);
    fetchData();
  };

  // APPLY SEARCH + FILTER
  const filteredCategories = categories.filter((c) => {
    const matchName = c.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || c.status === statusFilter;

    return matchName && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FaTags /> Category Management
        </h2>

        <button
          onClick={() => {
            setEditId(null);
            setName("");
            setStatus("Active");
            setOpen(true);
          }}
          className="flex items-center gap-2 bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      {/* SEARCH & FILTER */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            className="pl-10 pr-4 py-2 w-64 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="px-4 py-2 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

{/* CATEGORY TABLE */}
<div className="bg-white rounded-xl shadow">
  <div className="max-h-[60vh] overflow-y-auto overflow-x-auto scrollbar-hide">
    <table className="min-w-[1200px] w-full text-sm border-collapse">
      <thead className="bg-gray-800 text-white sticky top-0 z-10">
        <tr>
          <th className="p-4 text-left w-16">#</th>
          <th className="p-4 text-left">Category Name</th>
          <th className="p-4 text-left">Status</th>
          <th className="p-4 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredCategories.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center py-12 text-gray-500">
              No categories found
            </td>
          </tr>
        ) : (
          filteredCategories.map((c, index) => (
            <tr key={c._id} className="hover:bg-blue-50 transition">
              <td className="p-4 text-gray-500">{index + 1}</td>
              <td className="p-4 font-medium">{c.name}</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    c.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {c.status}
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-3">
                  <button
  onClick={() => openEdit(c)}
  className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
  title="Edit"
>
  <FaEdit size={18} />
</button>

<button
  onClick={() => deleteCategory(c._id)}
  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
  title="Delete"
>
  <FaTrash size={18} />
</button>

                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>




      {/* ADD / EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <FaTimes />
            </button>

            <h3 className="text-lg font-semibold mb-4">
              {editId ? "Edit Category" : "Add New Category"}
            </h3>

            <div className="space-y-4">
              <input
                className="w-full px-4 py-2 rounded-lg bg-gray-100"
                placeholder="Category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <select
                className="w-full px-4 py-2 rounded-lg bg-gray-100"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={saveCategory}
                disabled={loading}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
              >
                {editId ? "Update Category" : "Save Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTab;
