import { Outlet, Link } from "react-router-dom";
import { ShoppingBag, Menu, Search, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { CartSlideover } from "@/components/CartSlideover";

export function Navbar({ onOpenCart }: { onOpenCart: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));
  const wishlistItemCount = useWishlistStore((state) => state.items.length);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-white/10 py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white transition-colors">Shop</Link>
            <Link to="/about" className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white transition-colors">About</Link>
          </nav>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <span className="font-serif font-bold text-2xl tracking-[0.15em] uppercase">BlackX</span>
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center gap-5 md:gap-8">
            <div className="hidden md:flex items-center gap-8">
              <Link to="/contact" className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white transition-colors">Contact</Link>
            </div>
            
            <button className="text-white/80 hover:text-white transition-colors hidden md:block">
              <Search className="w-4 h-4" />
            </button>

            <Link to="/wishlist" className="relative text-white/80 hover:text-white transition-colors group">
              <Heart className="w-4 h-4" />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {wishlistItemCount}
                </span>
              )}
            </Link>

            <button onClick={onOpenCart} className="relative text-white/80 hover:text-white transition-colors group">
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

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
                <span className="font-serif font-bold text-xl tracking-[0.15em] uppercase">BlackX</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-8 items-center justify-center flex-1">
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="text-3xl font-serif text-white hover:text-white/70 transition-colors">Home</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/shop" className="text-3xl font-serif text-white hover:text-white/70 transition-colors">Shop</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/about" className="text-3xl font-serif text-white hover:text-white/70 transition-colors">About</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/contact" className="text-3xl font-serif text-white hover:text-white/70 transition-colors">Contact</Link>
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
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl tracking-[0.1em] mb-6 uppercase">BlackX</h3>
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
