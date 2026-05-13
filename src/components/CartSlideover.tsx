import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '@/store/cart';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

export function CartSlideover({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();
  const navigate = useNavigate();

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
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
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-serif text-xl tracking-[0.1em] uppercase flex items-center gap-2">
                <ShoppingBag size={20} /> Cart ({items.length})
              </h2>
              <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/50 space-y-4">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="text-sm tracking-widest uppercase">Your cart is empty</p>
                  <button 
                    onClick={() => { onClose(); navigate('/shop'); }}
                    className="mt-4 px-8 py-3 border border-white/20 hover:border-white text-xs tracking-widest uppercase transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                    <div className="w-24 h-32 bg-[#111] overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-all duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-sm tracking-wide leading-tight group-hover:text-white/80 transition-colors">
                            {item.name}
                          </h3>
                          <button 
                            onClick={() => removeItem(item.id, item.selectedSize)}
                            className="text-white/40 hover:text-white transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-white/50 text-xs tracking-widest mt-1">Size {item.selectedSize}</p>
                        <p className="font-sans text-sm mt-2">${item.price}</p>
                      </div>
                      
                      <div className="flex items-center border border-white/20 w-max">
                        <button 
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          className="px-3 py-1 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-xs">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="px-3 py-1 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
                <div className="flex justify-between items-center mb-6 text-lg">
                  <span className="font-serif tracking-wide uppercase text-white/70">Subtotal</span>
                  <span className="font-serif">${subtotal}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
