import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  FaPlus,
  FaBoxOpen,
  FaTimes,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

const ProductTab = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // form
  const [form, setForm] = useState({
    name: "",
    category: "",
    subCategory: "",
    brand: "",
    sku: "",
    unit: "kg",
    status: "Active",
  });

  const [editId, setEditId] = useState(null);

  // search & filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchProducts = async () => {
    const res = await api.get("/product");
    setProducts(res.data);
  };

  useEffect(() => {
    api.get("/category").then(res => setCategories(res.data));
    api.get("/sub-category").then(res => setSubCategories(res.data));
    fetchProducts();
  }, []);

  // prevent background scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE PRODUCT
  const saveProduct = async () => {
    if (!form.name || !form.category || !form.subCategory) return;

    setLoading(true);

    if (editId) {
      await api.put(`/product/${editId}`, form);
    } else {
      await api.post("/product", form);
    }

    setForm({
      name: "",
      category: "",
      subCategory: "",
      brand: "",
      sku: "",
      unit: "kg",
      status: "Active",
    });

    setEditId(null);
    setOpen(false);
    setLoading(false);
    fetchProducts();
  };

  // OPEN EDIT
  const openEdit = (p) => {
    setEditId(p._id);
    setForm({
      name: p.name,
      category: p.category?._id,
      subCategory: p.subCategory?._id,
      brand: p.brand,
      sku: p.sku,
      unit: p.unit,
      status: p.status,
    });
    setOpen(true);
  };

  // DELETE
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/product/${id}`);
    fetchProducts();
  };

  // SEARCH + FILTER
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || p.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FaBoxOpen /> Product Management
        </h2>

        <button
          onClick={() => {
            setEditId(null);
            setForm({
              name: "",
              category: "",
              subCategory: "",
              brand: "",
              sku: "",
              unit: "kg",
              status: "Active",
            });
            setOpen(true);
          }}
          className="flex items-center gap-2 bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* SEARCH & FILTER */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            className="pl-10 pr-4 py-2 w-64 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
            placeholder="Search product / brand..."
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

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow">
  <div className="max-h-[60vh] overflow-y-auto overflow-x-auto scrollbar-hide">
    <table className="min-w-[1200px] w-full text-sm border-collapse">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-4 text-left w-14">#</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Sub-Category</th>
              <th className="p-4 text-left">Brand</th>
              <th className="p-4 text-left">Unit</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-12 text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((p, index) => (
                <tr key={p._id} className="hover:bg-blue-50 transition">
                  <td className="p-4 text-gray-500">{index + 1}</td>
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4">{p.category?.name}</td>
                  <td className="p-4">{p.subCategory?.name}</td>
                  <td className="p-4">{p.brand}</td>
                  <td className="p-4 uppercase">{p.unit}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                      >
                        <FaEdit size={18} />
                      </button>

                      <button
                        onClick={() => deleteProduct(p._id)}
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

      {/* ADD / EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <FaTimes />
            </button>

            <h3 className="text-lg font-semibold mb-4">
              {editId ? "Edit Product" : "Add New Product"}
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="bg-gray-100 px-4 py-2 rounded-lg"
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="bg-gray-100 px-4 py-2 rounded-lg"
              >
                <option value="">Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                name="subCategory"
                value={form.subCategory}
                onChange={handleChange}
                className="bg-gray-100 px-4 py-2 rounded-lg"
              >
                <option value="">Sub-Category</option>
                {subCategories
                  .filter((sc) => sc.category?._id === form.category)
                  .map((sc) => (
                    <option key={sc._id} value={sc._id}>
                      {sc.name}
                    </option>
                  ))}
              </select>

              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="bg-gray-100 px-4 py-2 rounded-lg"
              />

              <input
                name="sku"
                value={form.sku}
                onChange={handleChange}
                placeholder="SKU / Barcode"
                className="bg-gray-100 px-4 py-2 rounded-lg"
              />

              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className="bg-gray-100 px-4 py-2 rounded-lg"
              >
                <option value="kg">kg</option>
                <option value="gm">gm</option>
                <option value="liter">liter</option>
                <option value="pcs">pcs</option>
              </select>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="bg-gray-100 px-4 py-2 rounded-lg"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={saveProduct}
                disabled={loading}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
              >
                {editId ? "Update Product" : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTab;
