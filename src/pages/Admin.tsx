import { useState } from "react";
import { Package, Plus, Search, LogOut } from "lucide-react";
import { useProductsStore } from "@/store/products";
import { AdminProductModal } from "@/components/AdminProductModal";
import type { Product } from "@/store/cart";
import DashboardCharts from "./DashboardCharts";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { products, addProduct, updateProduct, deleteProduct } =
    useProductsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      updateProduct(product.id, product);
    } else {
      addProduct(product);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <form
          className="w-full max-w-sm p-8 bg-[#111] border border-white/5"
          onSubmit={(e) => {
            e.preventDefault();
            setIsAuthenticated(true);
          }}
        >
          <h2 className="text-2xl text-center mb-8 text-white">
            BlackX Admin
          </h2>

          <input
            type="email"
            placeholder="Admin Email"
            className="w-full mb-4 p-2 bg-black border border-white/20 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-2 bg-black border border-white/20 text-white"
          />

          <button className="w-full bg-white text-black py-3">
            Enter Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 hidden md:block p-6">
        <h2 className="text-white mb-8">Portal</h2>

        <div className="space-y-4 text-white/60">
          <div className="flex items-center gap-3">
            <Package size={16} /> Products
          </div>
          <div>Orders</div>
          <div>Customers</div>
          <div className="mt-10">Settings</div>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="mt-10 text-red-400 flex items-center gap-2"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-white text-2xl">Inventory</h1>

          <button
            onClick={handleAddProduct}
            className="bg-white text-black px-4 py-2 flex items-center gap-2"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>

        {/* Charts */}
        <DashboardCharts />

        {/* Search */}
        <div className="mb-6 flex items-center gap-2">
          <Search size={16} className="text-white/50" />
          <input
            placeholder="Search inventory..."
            className="w-full p-2 bg-[#111] text-white border border-white/10"
          />
        </div>

        {/* Table */}
        <table className="w-full text-white">
          <thead>
            <tr className="text-left text-white/50">
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-white/10">
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{Math.floor(Math.random() * 50) + 5}</td>

                <td className="text-right space-x-4">
                  <button onClick={() => handleEditProduct(product)}>
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <AdminProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
          editingProduct={editingProduct}
        />
      </div>
    </div>
  );
}