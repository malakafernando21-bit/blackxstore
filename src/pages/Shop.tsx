import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from "motion/react";
import { Link } from "react-router-dom";
import { useProductsStore } from "@/store/products";
import { type Product, useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import React, { useRef, useState, useEffect } from "react";
import { ShoppingBag, Eye, Heart } from "lucide-react";
import { QuickViewModal } from "@/components/QuickViewModal";

const CylinderGallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop"
  ];

  const [radius, setRadius] = useState(300);
  const rotation = useMotionValue(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 285 : 475);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useAnimationFrame((_, delta) => {
    if (!isDragging.current) {
      rotation.set(rotation.get() - (15 * delta / 1000));
    }
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastX.current;
    rotation.set(rotation.get() + deltaX * 0.4);
    lastX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden [perspective:1000px] mb-24 relative touch-none select-none"
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
      
      <motion.div 
        className="relative w-[180px] md:w-[300px] h-[270px] md:h-[450px] cursor-grab active:cursor-grabbing"
        style={{ transformStyle: 'preserve-3d', rotateY: rotation }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {images.map((src, i) => {
          const angle = (i / images.length) * 360;
          return (
            <div
              key={i}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                backfaceVisibility: 'hidden',
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
              }}
            >
              <img src={src} alt="Model" className="w-full h-full object-cover filter grayscale opacity-30 md:grayscale md:hover:grayscale-0 md:opacity-100 transition-all duration-500 rounded-xl pointer-events-none" />
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-[#111] animate-pulse" />
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1 pr-4">
          <div className="w-1/3 h-3 bg-white/10 rounded" />
          <div className="w-2/3 h-5 bg-white/10 rounded" />
        </div>
        <div className="w-1/4 h-5 bg-white/10 rounded" />
      </div>
    </div>
  );
};

const ProductCard = ({ product, index, addItem, setQuickViewProduct }: any) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  const addItemToWishlist = useWishlistStore(state => state.addItem);
  const removeItemFromWishlist = useWishlistStore(state => state.removeItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist(product.id));

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      removeItemFromWishlist(product.id);
    } else {
      addItemToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 'M'); // default size
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      className="group flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-[#0a0a0a] mb-4 group">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#111] animate-pulse" />
        )}
        <img 
          ref={imgRef}
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-105' : 'scale-100'} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
        />
        
        {/* Quick actions overlay */}
        <div className={`absolute bottom-0 left-0 w-full p-4 flex gap-2 transition-all duration-300 ease-out ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button 
             onClick={handleAddToCart}
             className="flex-1 bg-white text-black py-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium hover:bg-gray-200 transition-colors shadow-lg"
          >
            Add to Cart
          </button>
          {/* Mobile visible add to cart */}
        </div>
        
        <div className="md:hidden absolute bottom-4 left-4 right-4">
           <button 
             onClick={handleAddToCart}
             className="w-full bg-white/90 backdrop-blur-sm text-black py-3 text-[10px] uppercase tracking-[0.2em] font-medium shadow-lg"
          >
            Add to Cart
          </button>
        </div>

        <button 
          onClick={toggleWishlist}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
        >
          <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} className={isInWishlist ? "text-red-500" : "text-white"} />
        </button>
        
        <button
           onClick={(e) => { e.preventDefault(); setQuickViewProduct(product); }}
           className="absolute top-4 left-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm text-white opacity-0 md:group-hover:opacity-100 transition-opacity"
        >
          <Eye size={16} />
        </button>
      </Link>

      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-1.5">{product.category}</p>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-white font-sans text-sm md:text-base font-light hover:text-white/70 transition-colors line-clamp-1">
               {product.name}
            </h3>
          </Link>
        </div>
        <p className="text-white font-sans text-sm md:text-base font-light tracking-wide">${product.price}</p>
      </div>
    </motion.div>
  );
};

export default function Shop() {
  const addItem = useCartStore((state) => state.addItem);
  const products = useProductsStore((state) => state.products);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-black pt-32 px-4 md:px-12 pb-32 overflow-hidden">
      <CylinderGallery />
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-serif text-4xl md:text-6xl uppercase tracking-widest"
            >
              The Archive
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white/40 text-xs md:text-sm tracking-[0.2em] uppercase mt-4"
            >
              Discover the latest arrivals and seasonal essentials.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-6 text-xs uppercase tracking-widest text-white/50"
          >
            <span>{products.length} Products</span>
            {/* Filter Placeholder */}
            <button className="hover:text-white transition-colors flex items-center gap-2">
              Filter / Sort
            </button>
          </motion.div>
        </div>

        {/* Clean, regular grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
          {products.map((product, i) => (
            <ProductCard 
              key={product.id}
              product={product}
              index={i}
              addItem={addItem}
              setQuickViewProduct={setQuickViewProduct}
            />
          ))}
        </div>
        
        {/* End Marker */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 pt-12 border-t border-white/10 text-center"
        >
          <span className="text-white/30 uppercase tracking-[0.2em] text-xs">You've reached the end</span>
        </motion.div>
      </div>

      <QuickViewModal 
        product={quickViewProduct} 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </div>
  );
}
