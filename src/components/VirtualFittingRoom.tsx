import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { X, Upload, ZoomIn, RotateCw } from 'lucide-react';
import { Product } from '@/lib/data';

interface VirtualFittingRoomProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function VirtualFittingRoom({ product, isOpen, onClose }: VirtualFittingRoomProps) {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setUserImage(e.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="w-full max-w-4xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[80vh]">
        {/* Workspace */}
        <div className="flex-1 relative bg-black/50 overflow-hidden flex items-center justify-center">
          {!userImage ? (
            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-6 text-white/50">
                <Upload size={32} />
              </div>
              <h3 className="text-xl uppercase tracking-widest mb-2 font-serif">Virtual Fit-On Room</h3>
              <p className="text-white/50 text-sm font-light max-w-sm mx-auto mb-8">
                Upload a full-body or torso photo of yourself to virtually try out the gear.
              </p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-black px-8 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-gray-200 transition-colors"
              >
                Upload Photo
              </button>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
              />
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center isolate overflow-hidden">
              <img 
                src={userImage} 
                alt="User" 
                className="max-w-full max-h-full object-contain select-none pointer-events-none z-10" 
              />
              <motion.img 
                drag
                dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
                dragElastic={0}
                style={{ scale, rotate: rotation }}
                src={product.image}
                alt={product.name}
                className="absolute w-64 md:w-80 object-contain cursor-move touch-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20"
              />
            </div>
          )}
        </div>

        {/* Controls Sidebar */}
        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-white/10 p-6 flex flex-col pt-8 md:pt-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-8 font-semibold">Controls</h3>

          <div className="space-y-8 flex-1">
            {/* Scale Control */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-white/70">
                <span className="flex items-center gap-2"><ZoomIn size={14}/> Scale</span>
                <span>{Math.round(scale * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="2.5" 
                step="0.05"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-white"
                disabled={!userImage}
              />
            </div>

            {/* Rotation Control */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-white/70">
                <span className="flex items-center gap-2"><RotateCw size={14}/> Rotate</span>
                <span>{rotation}°</span>
              </div>
              <input 
                type="range" 
                min="-180" 
                max="180" 
                value={rotation}
                onChange={(e) => setRotation(parseFloat(e.target.value))}
                className="w-full accent-white"
                disabled={!userImage}
              />
            </div>
          </div>

          <div className="mt-auto space-y-3">
            {userImage && (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full border border-white/20 text-white px-8 py-3 uppercase tracking-widest text-[10px] font-semibold hover:border-white transition-colors block text-center"
              >
                Change Photo
              </button>
            )}
            <p className="text-white/30 text-[10px] text-center uppercase tracking-widest leading-loose">
              Drag to position.<br/>Adjust sliders to fit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
