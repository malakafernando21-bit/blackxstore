import { useParams, useNavigate } from "react-router-dom";
import { useProductsStore } from "@/store/products";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowDown, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { VirtualFittingRoom } from "@/components/VirtualFittingRoom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useProductsStore(state => state.products);
  const product = products.find(p => p.id === id);
  const addItem = useCartStore(state => state.addItem);
  const addItemToWishlist = useWishlistStore(state => state.addItem);
  const removeItemFromWishlist = useWishlistStore(state => state.removeItem);
  const isInWishlist = useWishlistStore(state => product ? state.isInWishlist(product.id) : false);

  const toggleWishlist = () => {
    if (product) {
      if (isInWishlist) {
        removeItemFromWishlist(product.id);
      } else {
        addItemToWishlist(product);
      }
    }
  };
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [isFittingRoomOpen, setIsFittingRoomOpen] = useState(false);
  const containerRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 px-6 pb-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl uppercase tracking-widest mb-4">Product Not Found</h1>
          <button onClick={() => navigate('/shop')} className="text-white/50 hover:text-white uppercase tracking-widest text-xs transition-colors">
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, selectedSize);
  };

  return (
    <div ref={containerRef} className="bg-black text-white relative">
      
      {/* Background layer - heavily blurred scale down */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src={product.image} 
          alt="" 
          className="w-full h-full object-cover blur-[100px] scale-150"
        />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 hidden md:flex min-h-[150vh]">
        {/* Sticky Left Media */}
        <div className="w-[55%] h-screen sticky top-0 left-0 overflow-hidden flex items-center justify-center pt-24 pr-12 pb-12 pl-6 bg-black shadow-[0_0_100px_rgba(0,0,0,0.8)]">
           <button 
             onClick={() => navigate('/shop')}
             className="absolute top-32 left-12 z-50 flex items-center gap-2 text-white/50 hover:text-white uppercase tracking-[0.2em] text-[10px] transition-colors mix-blend-difference"
           >
             <ArrowLeft size={14} /> Shop
           </button>

           <motion.div 
             style={{ y: y1 }} 
             className="absolute inset-0 w-full h-[120%] -top-[10%] left-0 z-0 overflow-hidden cursor-crosshair"
             onMouseMove={(e) => {
               const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
               const x = ((e.clientX - left) / width) * 100;
               const y = ((e.clientY - top) / height) * 100;
               setMousePos({ x, y });
             }}
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => {
               setIsHovering(false);
               setTimeout(() => setMousePos({ x: 50, y: 50 }), 300);
             }}
           >
             <motion.img 
               animate={isHovering ? { scale: 2.2 } : { scale: [1, 1.05, 1] }}
               transition={isHovering ? { duration: 0.3, ease: "easeOut" } : {
                 duration: 20,
                 repeat: Infinity,
                 ease: "linear"
               }}
               style={{
                 transformOrigin: isHovering ? `${mousePos.x}% ${mousePos.y}%` : '50% 50%'
               }}
               src={product.image} 
               alt={product.name} 
               className={cn(
                 "w-full h-full object-cover transition-colors duration-500", 
                 isHovering ? "brightness-100" : "brightness-75"
               )} 
             />
           </motion.div>
           
           <motion.div 
             style={{ opacity }}
             className="absolute bottom-12 left-12 text-white/30 uppercase tracking-[0.3em] pl-6 text-[10px] transform -rotate-90 origin-bottom-left flex items-center gap-4"
           >
             <span className="w-12 h-[1px] bg-white/30"></span>
             Scroll to explore
           </motion.div>
        </div>

        {/* Right Content */}
        <div className="w-[45%] min-h-screen pt-[30vh] pb-32 pr-24 pl-12 flex flex-col justify-between">
          <motion.div style={{ y: y2 }}>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-6">
                <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-white/40"></span>
                  {product.category}
                </p>
                <button 
                  onClick={toggleWishlist}
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-colors"
                >
                  <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} className={isInWishlist ? "text-red-500" : ""} />
                </button>
              </div>
              <h1 className="font-serif text-6xl xl:text-8xl uppercase tracking-widest mb-6 leading-[0.9] mix-blend-difference">
                {product.name.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h1>
              <p className="text-3xl font-light tracking-wide text-white/80">${product.price}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-24 space-y-16"
            >
              <div className="max-w-md">
                <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6 font-semibold">Details</h3>
                <p className="text-white/70 leading-relaxed font-light text-base md:text-lg">
                  {product.description}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-6 max-w-[280px]">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 font-semibold">Size</h3>
                  <button className="text-[10px] uppercase tracking-[0.1em] text-white/40 hover:text-white transition-colors border-b border-white/20 pb-1 hover:border-white">Size Guide</button>
                </div>
                <div className="flex gap-4">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <button 
                      key={size} 
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "w-12 h-12 flex items-center justify-center transition-all duration-300 font-light text-sm uppercase",
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

              <div className="pt-8 flex flex-col gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="w-full max-w-sm bg-white text-black py-5 uppercase tracking-[0.2em] font-semibold text-xs hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                >
                  Acquire Item
                </button>
                
                <button 
                  onClick={() => setIsFittingRoomOpen(true)}
                  className="w-full max-w-sm border border-white/20 text-white py-4 uppercase tracking-[0.2em] font-semibold text-[10px] hover:border-white transition-colors"
                >
                  Virtual Fit-On Room
                </button>
                
                <div className="text-white/30 text-[10px] tracking-[0.2em] uppercase flex flex-col gap-3 mt-4">
                  <p>✓ Express International Shipping</p>
                  <p>✓ Complimentary returns within 14 days</p>
                  <p>✓ Lifetime guarantee on hardware</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden pt-24 px-6 pb-32">
        <button 
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-white/50 hover:text-white uppercase tracking-[0.2em] text-[10px] transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Archive
        </button>

        <div className="relative aspect-[3/4] mb-12 overflow-hidden bg-[#111]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <button 
            onClick={toggleWishlist}
            className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white"
          >
            <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} className={isInWishlist ? "text-red-500" : ""} />
          </button>
        </div>

        <div className="space-y-12">
          <div>
            <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase mb-4">{product.category}</p>
            <h1 className="font-serif text-5xl uppercase tracking-widest mb-4 leading-tight">{product.name}</h1>
            <p className="text-2xl font-light tracking-wide">${product.price}</p>
          </div>

          <p className="text-white/70 leading-relaxed font-light">
            {product.description}
          </p>

          <div>
             <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4 font-semibold">Size</h3>
             <div className="flex gap-3">
               {['S', 'M', 'L', 'XL'].map(size => (
                 <button 
                   key={size} 
                   onClick={() => setSelectedSize(size)}
                   className={cn(
                     "flex-1 h-12 flex items-center justify-center transition-all text-xs",
                     selectedSize === size 
                       ? "bg-white text-black font-semibold" 
                       : "border border-white/20 text-white/60"
                   )}
                 >
                   {size}
                 </button>
               ))}
             </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] font-semibold text-xs transition-colors"
          >
            Acquire Item
          </button>
          
          <button 
            onClick={() => setIsFittingRoomOpen(true)}
            className="w-full border border-white/20 text-white py-4 uppercase tracking-[0.2em] font-semibold text-[10px] transition-colors"
          >
            Virtual Fit-On Room
          </button>
        </div>
      </div>
      
      <VirtualFittingRoom 
        product={product} 
        isOpen={isFittingRoomOpen} 
        onClose={() => setIsFittingRoomOpen(false)} 
      />
    </div>
  );
}
