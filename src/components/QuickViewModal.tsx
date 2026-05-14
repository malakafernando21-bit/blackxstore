import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Product } from '@/store/cart';
import { useCartStore } from '@/store/cart';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState('M');

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, selectedSize);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] w-full max-w-4xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-50 text-white/50 hover:text-white bg-black/50 p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] bg-[#111] overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between max-h-[60vh] overflow-y-auto no-scrollbar">
              <div>
                <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-4">{product.category}</p>
                <h2 className="font-serif text-3xl uppercase tracking-widest mb-4 leading-tight">{product.name}</h2>
                <p className="text-xl font-light tracking-wide text-white/80 mb-6">${product.price}</p>
                
                <p className="text-white/60 leading-relaxed font-light text-sm mb-8 line-clamp-3">
                  {product.description}
                </p>

                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 font-semibold">Size</h3>
                  </div>
                  <div className="flex gap-3">
                    {['S', 'M', 'L', 'XL'].map(size => (
                      <button 
                        key={size} 
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "w-12 h-12 flex items-center justify-center transition-all duration-300 font-light text-xs uppercase",
                          selectedSize === size 
                            ? "bg-white text-black font-semibold" 
                            : "border border-white/20 text-white/60 hover:border-white hover:text-white"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] font-semibold text-xs hover:bg-gray-200 transition-colors"
                >
                  Acquire Item
                </button>
                <Link 
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="w-full block text-center border border-white/20 text-white py-4 uppercase tracking-[0.2em] font-semibold text-[10px] hover:border-white transition-colors"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
