import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  FaPlus,
  FaLayerGroup,
  FaTimes,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

const SubCategoryTab = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Active");
  const [editId, setEditId] = useState(null);


  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchData = async () => {
    const catRes = await api.get("/category");
    const subRes = await api.get("/sub-category");
    setCategories(catRes.data);
    setSubCategories(subRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const saveSubCategory = async () => {
    if (!name.trim() || !category) return;

    setLoading(true);

    if (editId) {
      await api.put(`/sub-category/${editId}`, {
        name,
        category,
        status,
      });
    } else {
      await api.post("/sub-category", {
        name,
        category,
        status,
      });
    }

    setName("");
    setCategory("");
    setStatus("Active");
    setEditId(null);
    setOpen(false);
    setLoading(false);
    fetchData();
  };


  const openEdit = (sc) => {
    setEditId(sc._id);
    setName(sc.name);
    setCategory(sc.category?._id || "");
    setStatus(sc.status);
    setOpen(true);
  };


  const deleteSubCategory = async (id) => {
    if (!window.confirm("Delete this sub-category?")) return;
    await api.delete(`/sub-category/${id}`);
    fetchData();
  };

  const filteredSubCategories = subCategories.filter((sc) => {
    const matchName = sc.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || sc.status === statusFilter;

    return matchName && matchStatus;
  });

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FaLayerGroup /> Sub-Category Management
        </h2>

        <button
          onClick={() => {
            setEditId(null);
            setName("");
            setCategory("");
            setStatus("Active");
            setOpen(true);
          }}
          className="flex items-center gap-2 bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600"
        >
          <FaPlus /> Add Sub-Category
        </button>
      </div>


      <div className="flex items-center gap-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            className="pl-10 pr-4 py-2 w-64 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
            placeholder="Search sub-category..."
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


      <div className="bg-white rounded-xl shadow">
        <div className="max-h-[60vh] overflow-y-auto overflow-x-auto scrollbar-hide">
          <table className="min-w-[1200px] w-full text-sm border-collapse">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-4 text-left w-16">#</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Sub-Category</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSubCategories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-500">
                    No sub-categories found
                  </td>
                </tr>
              ) : (
                filteredSubCategories.map((sc, index) => (
                  <tr
                    key={sc._id}
                    className="hover:bg-blue-50 transition"
                  >
                    <td className="p-4 text-gray-500 font-medium">
                      {index + 1}
                    </td>

                    <td className="p-4 font-medium text-gray-800">
                      {sc.category?.name || "-"}
                    </td>

                    <td className="p-4 text-gray-700">
                      {sc.name}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${sc.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {sc.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openEdit(sc)}
                          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                        >
                          <FaEdit size={18} />
                        </button>

                        <button
                          onClick={() => deleteSubCategory(sc._id)}
                          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
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
              {editId ? "Edit Sub-Category" : "Add New Sub-Category"}
            </h3>

            <div className="space-y-4">
              <select
                className="w-full px-4 py-2 rounded-lg bg-gray-100"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <input
                className="w-full px-4 py-2 rounded-lg bg-gray-100"
                placeholder="Sub-category name"
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
                onClick={saveSubCategory}
                disabled={loading}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
              >
                {editId ? "Update Sub-Category" : "Save Sub-Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubCategoryTab;
