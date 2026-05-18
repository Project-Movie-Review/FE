import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';
import { User, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthInput from '../components/AuthInput';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const { data } = await register(username, email, password);
      console.log(data);
      if (data) {
         alert('Đăng ký thành công!');
         navigate('/login');
      }
    } catch (err) {
      if(err.response?.data?.error) {
        setError(err.response.data.error) || 'Dữ liệu không hợp lệ';
      } else {
        setError(err.response?.data?.message || 'Email đã tồn tại hoặc thông tin không hợp lệ');
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cinema-black relative font-sans overflow-hidden"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Background Overlay: Radial Gradient tạo ánh sáng hội tụ */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(63,63,70,0.5)_0%,rgba(18,18,18,0.98)_100%)]"></div>
      
      {/* Khung Card: Premium Cinematic Glassmorphism */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-cinema-zinc/70 backdrop-blur-xl p-10 rounded-xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] w-full max-w-md border border-white/10 relative z-10"
      >
        <h2 className="text-4xl font-bold mb-8 text-white tracking-wide">Đăng ký</h2>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-500/10 border-l-4 border-red-500 text-red-400 p-3 rounded mb-6 text-sm transition-all duration-500"
          >
            {error}
          </motion.div>
        )}
        
        <form className="space-y-6" onSubmit={handleRegister}>
          <AuthInput
            icon={User}
            type="text"
            value={username}
            placeholder="Nhập tên của bạn"
            onChange={(e) => setUsername(e.target.value)}
          />
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
            Đăng ký
          </button>
        </form>
        <p className="text-gray-400 mt-8 text-center text-sm tracking-wide">
          Đã có tài khoản? <Link to="/login" className="text-white font-medium hover:text-cinema-red transition-colors duration-500 hover:underline">Đăng nhập</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;