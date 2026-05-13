import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { products, Product } from "@/lib/data";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useRef, useState, useEffect } from "react";
import { ShoppingBag, Eye, Heart } from "lucide-react";
import { QuickViewModal } from "@/components/QuickViewModal";

const ProductSkeleton = ({ index, getGridClass }: { index: number, getGridClass: (index: number) => string }) => {
  return (
    <div className={`relative rounded-sm overflow-hidden bg-[#111] animate-pulse ${getGridClass(index)}`}>
      <div className="absolute top-6 right-6 md:top-8 md:right-8 w-16 h-8 bg-white/10" />
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-[80%] flex flex-col justify-end gap-3">
        <div className="w-20 h-2 bg-white/10" />
        <div className="w-3/4 h-8 md:h-12 bg-white/10" />
      </div>
    </div>
  );
};

const ProductCard = ({ product, index, addItem, setQuickViewProduct, getGridClass, getTransformOrigin }: any) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  
  const { toggleWishlist, isInWishlist } = useWishlistStore(state => ({
    toggleWishlist: () => state.isInWishlist(product.id) ? state.removeItem(product.id) : state.addItem(product),
    isInWishlist: state.isInWishlist(product.id)
  }));

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 120, scale: 0.9, filter: 'blur(15px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 1.4, 
        delay: (index % 3) * 0.15,
        ease: [0.25, 1, 0.5, 1] 
      }}
      className={`group relative outline-none rounded-sm overflow-hidden ${getGridClass(index)}`}
    >
      <Link to={`/product/${product.id}`} className="block w-full h-full relative cursor-pointer overflow-hidden">
        {/* Background Image Wrap with Parallax and Hover Zoom */}
        <div className={`absolute inset-0 w-full h-full scale-110 group-hover:scale-[1.25] transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${getTransformOrigin(index)}`}>
          <motion.img 
            style={{ y }}
            src={product.image} 
            alt={product.name} 
            className="absolute top-[-15%] left-0 w-full h-[130%] object-cover brightness-50 group-hover:brightness-90 transition-all duration-[1.5s] ease-in-out" 
          />
        </div>
        
        {/* Dark gradient overlay that moves away on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-1000 group-hover:opacity-40" />
        
        {/* Top Right: Wishlist and Price Drops in unexpectedly on hover */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 z-30 flex flex-col items-end gap-3 translate-y-[-120%] group-hover:translate-y-0 transition-transform duration-[0.6s] ease-out">
          <motion.span 
            initial={false}
            className="block font-sans text-2xl font-light text-white tracking-widest mix-blend-exclusion"
          >
            ${product.price}
          </motion.span>
        </div>

        <div className="absolute top-16 right-6 md:top-20 md:right-8 z-40 translate-x-[150%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-[0.6s] delay-100 ease-out">
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist();
            }}
            className="w-10 h-10 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} className={isInWishlist ? "text-red-500 hover:text-red-600 transition-colors" : ""} />
          </button>
        </div>

        {/* Bottom Info: Slides up aggressively */}
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 flex flex-col justify-end w-[80%]">
          <div className="overflow-hidden mb-2">
            <p className="text-white text-[10px] md:text-xs tracking-[0.3em] uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100 mix-blend-difference">
              {product.category}
            </p>
          </div>
          <h3 className="font-serif text-3xl md:text-5xl text-white/50 group-hover:text-white tracking-wider leading-none transition-colors duration-700">
            {product.name}
          </h3>
        </div>

        {/* Quick Add Split Buttons */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addItem(product, 'M');
            }}
            className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center -translate-x-20 group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-black hover:text-white hover:border hover:border-white shadow-2xl"
          >
            <ShoppingBag size={22} />
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              setQuickViewProduct(product);
            }}
            className="w-16 h-16 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center translate-x-20 group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white hover:text-black shadow-2xl"
          >
            <Eye size={22} />
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default function Shop() {
  const addItem = useCartStore((state) => state.addItem);
  const containerRef = useRef(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading delay to show off the skeletons
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background text parallax
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const title = "THE ARCHIVE";

  // Asymmetric editorial grid classes
  const getGridClass = (index: number) => {
    const classes = [
      "col-span-12 md:col-span-8 md:row-span-2", // 0: Hero feature layout
      "col-span-12 md:col-span-4 md:row-span-1", // 1: Standard square-ish
      "col-span-12 md:col-span-4 md:row-span-1", // 2: Standard square-ish
      "col-span-12 md:col-span-6 md:row-span-2", // 3: Tall format
      "col-span-12 md:col-span-6 md:row-span-1", // 4: Landscape
      "col-span-12 md:col-span-4 md:row-span-1", // 5: Standard
      "col-span-12 md:col-span-8 md:row-span-1", // 6: Wide feature
      "col-span-12 md:row-span-2",               // 7: Full width poster
    ];
    return classes[index % classes.length];
  };

  // Randomize transform origins to make hover zooms unpredictable
  const getTransformOrigin = (index: number) => {
    const origins = ["origin-center", "origin-top", "origin-bottom", "origin-left", "origin-right"];
    return origins[index % origins.length];
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black pt-32 px-4 md:px-8 pb-32 overflow-hidden relative">
      
      {/* Glitchy/Edgy background text */}
      <motion.div 
        style={{ x: bgX }}
        className="fixed top-[40%] left-0 whitespace-nowrap text-[15vw] md:text-[18vw] font-serif font-black text-white/[0.03] pointer-events-none z-0 uppercase leading-none tracking-tighter"
      >
        VOID COLLECTION — WEAR THE DARK — SHADOWS — 
      </motion.div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Staggered unpredictable title reveal */}
        <div className="mb-24 flex items-center justify-between w-full">
          <h1 className="font-serif text-5xl md:text-8xl uppercase tracking-widest flex overflow-hidden">
            {title.split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: 150, rotate: 25, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.05 + 0.2, // Staggered drop-in
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1 }}
            className="hidden md:flex flex-col items-end text-xs tracking-[0.2em] text-white/40 uppercase"
          >
            <span>Season 01</span>
            <span>The Absence of Light</span>
          </motion.div>
        </div>

        {/* The Asymmetric Grid Engine */}
        <div className="grid grid-cols-12 auto-rows-[350px] md:auto-rows-[450px] gap-2 md:gap-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={`skeleton-${i}`} index={i} getGridClass={getGridClass} />
            ))
          ) : (
            products.map((product, i) => (
              <ProductCard 
                key={product.id}
                product={product}
                index={i}
                addItem={addItem}
                setQuickViewProduct={setQuickViewProduct}
                getGridClass={getGridClass}
                getTransformOrigin={getTransformOrigin}
              />
            ))
          )}
        </div>
        
        {/* End Marker */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-32 pt-12 border-t border-white/10 flex justify-between items-center text-white/30 uppercase tracking-[0.2em] text-xs"
        >
          <span>End of Archive</span>
          <span className="font-serif italic capitalize text-sm">Nothing more to show.</span>
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
