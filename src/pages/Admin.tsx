import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, Plus, Search, LogOut } from "lucide-react";
import { products } from "@/lib/data";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-black">
        <form 
          className="w-full max-w-sm p-8 bg-[#111] border border-white/5 shadow-2xl"
          onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }}
        >
          <h2 className="font-serif text-2xl uppercase tracking-widest mb-8 text-center">BlackX Admin</h2>
          <div className="space-y-6">
            <input required type="email" placeholder="Admin Email" defaultValue="admin@blackx.store" className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors" />
            <input required type="password" placeholder="Password" defaultValue="password" className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors" />
          </div>
          <button type="submit" className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] font-semibold mt-8 hover:bg-gray-200 transition-colors text-xs">
            Enter Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 h-[calc(100vh-6rem)] border-r border-white/10 hidden md:block">
          <div className="p-8">
            <h2 className="font-serif text-xl tracking-[0.15em] uppercase mb-12">Portal</h2>
            <nav className="space-y-6">
              <a href="#" className="flex items-center gap-4 text-white/50 hover:text-white transition-colors uppercase text-xs tracking-widest bg-white/5 p-3 rounded-sm">
                <Package size={16} /> Products
              </a>
              <a href="#" className="flex items-center gap-4 text-white/50 hover:text-white transition-colors uppercase text-xs tracking-widest p-3">
                Orders
              </a>
              <a href="#" className="flex items-center gap-4 text-white/50 hover:text-white transition-colors uppercase text-xs tracking-widest p-3">
                Customers
              </a>
              <a href="#" className="flex items-center gap-4 text-white/50 hover:text-white transition-colors uppercase text-xs tracking-widest p-3 mt-12">
                Settings
              </a>
            </nav>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="absolute bottom-8 flex items-center gap-4 text-white/30 hover:text-white transition-colors uppercase text-xs tracking-widest p-3"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-12 overflow-y-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
            <div>
              <h1 className="font-serif text-3xl uppercase tracking-widest">Inventory</h1>
              <p className="text-white/50 text-xs tracking-widest mt-2 uppercase">Manage your collections</p>
            </div>
            <button className="bg-white text-black px-6 py-3 uppercase tracking-widest font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors text-xs">
              <Plus size={16} /> Add Product
            </button>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
            <div className="p-4 border-b border-white/5 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input type="text" placeholder="Search inventory..." className="w-full bg-[#111] border border-white/10 rounded-sm py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-white/30 text-white placeholder-white/30 transition-colors" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/40">
                    <th className="p-6 font-normal">Product</th>
                    <th className="p-6 font-normal">Category</th>
                    <th className="p-6 font-normal">Price</th>
                    <th className="p-6 font-normal">Stock</th>
                    <th className="p-6 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <img src={product.image} alt={product.name} className="w-12 h-16 object-cover bg-black" />
                          <span className="font-serif text-sm tracking-wide">{product.name}</span>
                        </div>
                      </td>
                      <td className="p-6 text-xs text-white/60 tracking-widest uppercase">{product.category}</td>
                      <td className="p-6 text-sm font-sans">${product.price}</td>
                      <td className="p-6">
                        <span className="bg-white/10 text-white/80 px-3 py-1 rounded-sm text-xs font-sans">
                          {Math.floor(Math.random() * 50) + 5} in stock
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <button className="text-white/40 hover:text-white uppercase tracking-widest text-[10px] underline underline-offset-4 transition-colors">
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
      </div>
    </div>
  );
}
