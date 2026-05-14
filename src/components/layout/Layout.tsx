import { Outlet, Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, Search, X, Heart, LogOut, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { CartSlideover } from "@/components/CartSlideover";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export function Navbar({ onOpenCart }: { onOpenCart: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  
  const cartItemCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));
  const wishlistItemCount = useWishlistStore((state) => state.items.length);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out border-b border-transparent",
          isScrolled
            ? "bg-black/90 backdrop-blur-md border-white/10 py-3 md:py-4"
            : "bg-transparent py-4 md:py-6"
        )}
      >
        <div className="max-w-[1800px] mx-auto px-4 md:px-12 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white/80 hover:text-white transition-colors p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white transition-colors">Shop</Link>
            <Link to="/about" className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white transition-colors">About</Link>
          </nav>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <span className="font-serif font-bold text-2xl md:text-3xl tracking-[0.15em] uppercase flex items-baseline">
              BLACK<span className="text-[1.25em] leading-none">X</span>
            </span>
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden md:flex items-center gap-8 mr-4">
              <Link to="/contact" className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white transition-colors">Contact</Link>
            </div>
            
            {user ? (
               <button onClick={handleLogout} className="text-white/80 hover:text-white transition-colors p-2 md:p-0">
                 <LogOut className="w-5 h-5 md:w-4 md:h-4" />
               </button>
            ) : (
               <Link to="/login" className="text-white/80 hover:text-white transition-colors p-2 md:p-0">
                 <User className="w-5 h-5 md:w-4 md:h-4" />
               </Link>
            )}

            <button className="text-white/80 hover:text-white transition-colors hidden md:block p-2 md:p-0">
              <Search className="w-4 h-4" />
            </button>

            <Link to="/wishlist" className="relative text-white/80 hover:text-white transition-colors group p-2 md:p-0">
              <Heart className="w-5 h-5 md:w-4 md:h-4" />
              {wishlistItemCount > 0 && (
                <span className="absolute 0 md:-top-2 right-0 md:-right-2 bg-white text-black text-[10px] font-bold w-4 h-4 md:w-4 md:h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {wishlistItemCount}
                </span>
              )}
            </Link>

            <button onClick={onOpenCart} className="relative text-white/80 hover:text-white transition-colors group p-2 pr-0 md:p-0">
              <ShoppingBag className="w-5 h-5 md:w-4 md:h-4" />
              {cartItemCount > 0 && (
                <span className="absolute 0 md:-top-2 right-0 md:-right-2 bg-white text-black text-[10px] font-bold w-4 h-4 md:w-4 md:h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif font-bold text-2xl tracking-[0.15em] uppercase flex items-baseline">
                  BLACK<span className="text-[1.25em] leading-none">X</span>
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/70 hover:text-white p-2 -mr-2"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>
              <nav className="flex flex-col gap-8 items-center justify-center flex-1">
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="text-3xl font-serif text-white hover:text-white/70 transition-colors">Home</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/shop" className="text-3xl font-serif text-white hover:text-white/70 transition-colors">Shop</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/about" className="text-3xl font-serif text-white hover:text-white/70 transition-colors">About</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/contact" className="text-3xl font-serif text-white hover:text-white/70 transition-colors">Contact</Link>
                {user ? (
                   <button onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} className="text-3xl font-serif text-white hover:text-white/70 transition-colors text-red-500">Logout</button>
                ) : (
                   <Link onClick={() => setIsMobileMenuOpen(false)} to="/login" className="text-3xl font-serif text-white hover:text-white/70 transition-colors">Login</Link>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl tracking-[0.1em] mb-6 uppercase flex items-baseline">
              BLACK<span className="text-[1.25em] leading-none">X</span>
            </h3>
            <p className="text-white/50 text-sm max-w-sm font-light leading-relaxed">
              We redefine luxury streetwear with a premium dark aesthetic. 
              Modern minimalism meets high-end fashion. Wear the dark.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-semibold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-white/30 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} BlackX Store</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const isOpen = useCartStore((state) => state.isOpen);
  const setIsOpen = useCartStore((state) => state.setIsOpen);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-white selection:text-black">
      <Navbar onOpenCart={() => setIsOpen(true)} />
      <CartSlideover isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
