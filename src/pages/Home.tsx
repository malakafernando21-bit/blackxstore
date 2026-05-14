import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          {/* Video Background */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-60 mix-blend-screen scale-105"
          >
            <source src="https://cdn.coverr.co/videos/coverr-fashion-model-in-the-studio-2804/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />
        </div>
        
        <div className="relative z-20 text-center px-4 w-full flex flex-col items-center">
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 5, 
              rotateX: 180,
              rotateY: 180,
              rotateZ: 360,
              x: '100vw', 
              y: '-100vh',
              skewX: 45,
              filter: 'blur(20px)'
            }}
            animate={{ 
              opacity: [0, 0.8, 1, 1],
              scale: [5, 0.2, 1.5, 1],
              rotateX: [180, 0, 0, 0],
              rotateY: [180, 0, 0, 0],
              rotateZ: [360, -180, 45, 0],
              x: ['100vw', '-30vw', '10vw', '0vw'],
              y: ['-100vh', '50vh', '-10vh', '0vh'],
              skewX: [45, -45, 10, 0],
              filter: ['blur(20px)', 'blur(5px)', 'blur(0px)', 'blur(0px)']
            }}
            transition={{
              duration: 3,
              times: [0, 0.5, 0.8, 1],
              ease: "backInOut"
            }}
            className="w-40 h-40 md:w-64 md:h-64 mb-6 relative"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-full text-white"
            >
              <svg viewBox="0 0 100 120" fill="currentColor" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                <defs>
                  <mask id="x-gap">
                    <rect width="100%" height="100%" fill="white" />
                    <polygon points="56,10 99,10 44,110 1,110" fill="black" />
                  </mask>
                </defs>
                
                {/* The \ stroke with mask */}
                <polygon points="10,10 35,10 90,110 65,110" mask="url(#x-gap)" />
                
                {/* The / stroke */}
                <polygon points="65,10 90,10 35,110 10,110" />
              </svg>
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[15vw] md:text-[10vw] leading-none text-white uppercase tracking-tighter flex items-baseline justify-center"
          >
            BLACK<span className="text-[1.25em] leading-none ml-1 md:ml-2">X</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6 text-sm md:text-base tracking-[0.3em] text-white/70 uppercase max-w-lg mx-auto"
          >
            Wear The Dark.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-6"
          >
            <Link 
              to="/shop" 
              className="px-10 py-4 bg-white text-black font-semibold tracking-widest uppercase text-xs hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3"
            >
              Shop Now <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-32 bg-black text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl leading-tight font-light text-white/90">
            Black is not a color. <br/><span className="italic text-white/50">It's an attitude.</span>
          </h2>
          <p className="border-l text-left border-white/20 pl-6 text-white/60 mt-16 max-w-xl mx-auto leading-relaxed text-sm">
            We strip away the noise. What remains is form, silhouette, and the deepest shades of black. Our garments are engineered for those who find power in minimalism.
          </p>
        </div>
      </section>
    </div>
  )
}
