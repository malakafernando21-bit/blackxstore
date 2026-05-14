import { useCartStore } from "@/store/cart";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center bg-black overflow-hidden relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md relative z-10"
        >
          <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="font-serif text-3xl uppercase tracking-widest mb-4">Order Placed</h1>
          <p className="text-white/60 font-light mb-8">
            Your premium BlackX order has been confirmed. You will receive tracking details shortly.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-white text-black py-4 uppercase tracking-widest text-xs font-semibold hover:bg-gray-200 transition-colors"
          >
            Return to Home
          </button>
        </motion.div>

        {/* Animated Moving Truck */}
        <div className="mt-16 w-full max-w-lg flex justify-center border-b border-white/20 pb-1 relative overflow-visible h-32">
           <motion.div
             initial={{ x: 0 }}
             animate={{ x: "-100vw" }}
             transition={{ duration: 2.5, delay: 2.2, ease: "easeIn" }}
             className="relative w-[180px] h-[70px] mt-auto"
           >
             {/* Package Drop */}
             <motion.div
               initial={{ y: -150, rotate: 20, opacity: 0 }}
               animate={{ y: 22, rotate: 0, opacity: 1 }}
               transition={{ duration: 1, delay: 0.5, type: "spring", bounce: 0.6 }}
               className="absolute left-[85px] top-0 w-8 h-8 border border-white/50 bg-[#111] flex items-center justify-center shadow-lg"
             >
               <span className="text-white/80 text-[10px] font-serif">X</span>
             </motion.div>

             {/* Lorry SVG Pointing Left */}
             <svg className="absolute inset-0 z-10 drop-shadow-xl" width="180" height="70" viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Back Box Container */}
                <path d="M80 15 L140 15 L140 55 L80 55 Z" fill="#050505" stroke="white" strokeWidth="2" />
                <path d="M140 15 L150 5 L150 45 L140 55" fill="#111" stroke="white" strokeWidth="1" />
                
                {/* Front Cabin */}
                <path d="M80 25 L65 25 L50 35 L20 35 C15 35 10 40 10 48 V55 H80 Z" fill="#0A0A0A" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                
                {/* Window */}
                <path d="M65 27 L53 35 H75 V28 Z" fill="#222" stroke="white" strokeWidth="1" />
                
                {/* Wheels */}
                <circle cx="35" cy="55" r="8" fill="#111" stroke="white" strokeWidth="2" />
                <circle cx="95" cy="55" r="8" fill="#111" stroke="white" strokeWidth="2" />
                <circle cx="125" cy="55" r="8" fill="#111" stroke="white" strokeWidth="2" />
                
                {/* Branding marking */}
                <text x="110" y="42" fill="white" fontSize="11" fontFamily="serif" textAnchor="middle" letterSpacing="0.15em">BLACKX</text>
             </svg>
           </motion.div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50 mb-4 uppercase tracking-widest">Your cart is empty</p>
          <Link to="/shop" className="underline underline-offset-4 text-xs uppercase tracking-widest">Go to Shop</Link>
        </div>
      </div>
    );
  }

  const handleStripeCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call and Stripe redirect
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 px-6 pb-24 max-w-6xl mx-auto">
      <div className="flex items-center text-xs tracking-widest text-white/40 uppercase mb-12">
        <Link to="/cart" className="hover:text-white">Cart</Link>
        <ChevronRight size={14} className="mx-2" />
        <span className="text-white">Checkout</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1 order-2 lg:order-1">
          <h2 className="font-serif text-2xl uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Shipping & Payment</h2>
          <form onSubmit={handleStripeCheckout} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4">Contact Info</h3>
              <input required type="email" placeholder="Email Address" className="w-full bg-transparent border border-white/20 p-4 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors" />
            </div>

            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4">Shipping Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="First Name" className="w-full bg-transparent border border-white/20 p-4 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors" />
                <input required type="text" placeholder="Last Name" className="w-full bg-transparent border border-white/20 p-4 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors" />
              </div>
              <input required type="text" placeholder="Address" className="w-full bg-transparent border border-white/20 p-4 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="City" className="w-full bg-transparent border border-white/20 p-4 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors" />
                <input required type="text" placeholder="Postal Code" className="w-full bg-transparent border border-white/20 p-4 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors" />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isProcessing}
              className="w-full bg-white text-black py-5 uppercase tracking-[0.2em] font-semibold text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-8"
            >
              {isProcessing ? 'Processing via Stripe...' : `Pay $${subtotal + 25}`}
            </button>
            <p className="text-center text-[10px] text-white/30 uppercase tracking-widest mt-4">Transactions are encrypted and secured</p>
          </form>
        </div>

        <div className="lg:w-[400px] order-1 lg:order-2">
          <div className="bg-[#111] p-8 top-32 sticky rounded-sm">
            <h2 className="font-serif text-lg uppercase tracking-widest mb-6">Order Summary</h2>
            <div className="flex flex-col gap-4 mb-8">
              {items.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                  <div className="w-16 h-20 bg-black overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-sm font-serif">{item.name}</h4>
                    <p className="text-xs text-white/50 tracking-widest uppercase mt-1">Size: {item.selectedSize}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-white/50">Qty: {item.quantity}</p>
                      <p className="text-sm">${item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 space-y-4 text-sm">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Shipping</span>
                <span>$25.00</span>
              </div>
              <div className="flex justify-between text-white text-lg font-serif pt-4 border-t border-white/10">
                <span>Total</span>
                <span>${subtotal + 25}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
