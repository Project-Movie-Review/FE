import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchBar from './Search';
import UserProfile from './User';
import UserButton from './UserButton';

const Navbar = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const handleStorage = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-cinema-black/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-3xl font-bold text-cinema-red tracking-wider">FILMREVIEW</Link>
          {isAdmin && (
            <Link to="/admin/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-blue-900/20">
              Admin Panel
            </Link>
          )}
        </div>
        
        <SearchBar />

        <div className="flex items-center space-x-6">
          <UserProfile />
          <UserButton/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;