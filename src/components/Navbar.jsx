import React, { useState } from 'react';
import { Search, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const isLoggedIn = !!localStorage.getItem('access_token');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-cinema-black/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-cinema-red tracking-wider">FILMREVIEW</Link>
        
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8 relative hidden md:block">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm phim, diễn viên..."
            className="w-full bg-cinema-zinc/50 text-white pl-12 pr-4 py-2.5 rounded-full border border-white/10 focus:border-cinema-red focus:ring-1 focus:ring-cinema-red outline-none transition-all shadow-inner"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </form>

        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" className="hidden md:flex items-center text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all">
                  Dashboard
                </Link>
              )}
              <Link to="/profile" className="hidden md:flex items-center text-sm text-gray-300 hover:text-white transition-colors cursor-pointer">
                <User className="w-5 h-5 mr-2" />
                {user.username || 'Tài khoản'}
              </Link>
              <button onClick={handleLogout} className="text-gray-400 hover:text-cinema-red transition-colors" title="Đăng xuất">
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-cinema-red text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg text-sm">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;