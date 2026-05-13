import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";
import { ShoppingBag, Trash2 } from "lucide-react";

export default function Wishlist() {
  const { items, removeItem } = useWishlistStore();
  const addItemToCart = useCartStore((state) => state.addItem);

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="font-serif text-3xl mb-6">Your Wishlist is Empty</h1>
        <p className="text-white/50 mb-8 max-w-sm text-center">Save items you love to your wishlist and come back to them later.</p>
        <Link 
          to="/shop" 
          className="px-8 py-4 bg-white text-black font-semibold tracking-widest text-xs uppercase hover:bg-white/90 transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-serif text-4xl mb-2 text-white">Wishlist</h1>
        <p className="text-white/50 mb-12 tracking-widest uppercase text-xs">Curated for you</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-white/5 mb-4">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                </Link>
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => removeItem(product.id)}
                    className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button 
                    onClick={() => addItemToCart(product, 'M')}
                    className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  >
                    <ShoppingBag size={16} />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-lg text-white/90">{product.name}</h3>
                <p className="text-white/50">${product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
