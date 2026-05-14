import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { motion } from 'motion/react';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/shop';

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate(from, { replace: true });
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Google sign in failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 px-4 md:px-8 pb-32 flex items-center justify-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#111] border border-white/10 p-8 rounded-sm relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl uppercase tracking-widest">{isLogin ? 'Sign In' : 'Sign Up'}</h1>
          <p className="text-white/50 text-xs tracking-[0.2em] uppercase mt-2">
            {isLogin ? 'Welcome back to the void' : 'Join the darkness'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-xs tracking-wide">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20 text-sm"
                placeholder="void@blackx.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20 text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] font-semibold hover:bg-gray-200 transition-colors text-xs disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-xs tracking-widest uppercase">
          <span className="w-1/5 border-b border-white/10"></span>
          <span className="text-white/40">Or Continue With</span>
          <span className="w-1/5 border-b border-white/10"></span>
        </div>

        <button 
          onClick={signInWithGoogle}
          className="w-full mt-6 bg-[#0a0a0a] border border-white/10 text-white flex items-center justify-center gap-3 py-4 hover:bg-white/5 transition-colors uppercase tracking-[0.1em] text-xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>

        <div className="mt-8 text-center text-xs text-white/50 uppercase tracking-widest">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-white hover:underline underline-offset-4"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
