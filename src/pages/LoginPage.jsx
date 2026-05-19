import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getInfo, login } from '../services/api';
import { Mail, Lock, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthInput from '../components/AuthInput';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await login(email, password);
      localStorage.setItem('accessToken', data.accessToken);
      const userInfo = await getInfo();
      localStorage.setItem('user', JSON.stringify(userInfo.data));
      
      const role = userInfo.data.role;
      if (role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Tài khoản hoặc mật khẩu không chính xác');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cinema-black relative font-sans overflow-hidden auth-bg-wrapper">
      {/* Floating Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 hover:scale-105 active:scale-95 shadow-lg backdrop-blur-md home-back-btn"
      >
        <Home className="w-4 h-4" />
        Về trang chủ
      </Link>

      {/* Background Overlay */}
      <div className="absolute inset-0 auth-bg-overlay"></div>
      
      {/* Khung Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-cinema-zinc/70 backdrop-blur-xl p-10 rounded-xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] w-full max-w-md border border-white/10 relative z-10 auth-card"
      >
        <h2 className="text-4xl font-bold mb-8 text-white tracking-wide">Đăng nhập</h2>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-500/10 border-l-4 border-red-500 text-red-400 p-3 rounded mb-6 text-sm transition-all duration-500"
          >
            {error}
          </motion.div>
        )}
        
        <form className="space-y-6" onSubmit={handleLogin}>
          <AuthInput
            icon={Mail}
            type="email"
            value={email}
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthInput 
            icon={Lock}
            type="password"
            value={password}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="relative w-full overflow-hidden bg-gradient-to-r from-cinema-red to-[#83050C] text-white font-bold py-4 rounded-lg mt-8 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] active:scale-95 text-lg tracking-wide border border-red-500/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700">
            Đăng nhập
          </button>
        </form>
        <p className="text-gray-400 mt-8 text-center text-sm tracking-wide">
          Chưa có tài khoản? <Link to="/register" className="text-white font-medium hover:text-cinema-red transition-colors duration-500 hover:underline">Đăng ký ngay</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;