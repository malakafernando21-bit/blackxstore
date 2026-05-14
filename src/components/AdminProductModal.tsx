import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { type Product } from '@/store/cart';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  editingProduct?: Product | null;
}

export function AdminProductModal({ isOpen, onClose, onSave, editingProduct }: AdminProductModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: ''
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData({
        name: '',
        price: 0,
        description: '',
        image: '',
        category: ''
      });
    }
  }, [editingProduct, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image || !formData.category) return;
    
    onSave({
      id: editingProduct?.id || `p_${Date.now()}`,
      name: formData.name,
      price: Number(formData.price),
      description: formData.description || '',
      image: formData.image,
      category: formData.category
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-[#111] border border-white/10 z-[101] shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="font-serif text-2xl uppercase tracking-widest">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Price</label>
                  <input 
                    required
                    type="number" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Category</label>
                  <input 
                    required
                    type="text" 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Image URL</label>
                <input 
                  required
                  type="url" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Description</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] font-semibold hover:bg-gray-200 transition-colors text-xs"
              >
                {editingProduct ? 'Save Changes' : 'Create Product'}
              </button>
            </form>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
