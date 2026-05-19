import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchBar from './Search';
import UserProfile from './User';
import UserButton from './UserButton';
import AdminButton from './AdminButton';
import FilterDialog from '../FilterDialog';

const Navbar = ({ onOpenFilter: externalOpenFilter }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  useEffect(() => {
    const activeTheme = localStorage.getItem('theme') || 'dark';
    setTheme(activeTheme);
    if (activeTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, []);

  const handleOpen = () => {
    if (typeof externalOpenFilter === 'function') {
      externalOpenFilter();
    } else {
      setIsFilterOpen(true);
    }
  };

  const handleClose = () => setIsFilterOpen(false);

  const handleFilter = (filterOptions) => {
    setIsFilterOpen(false);
    try {
      const params = new URLSearchParams();
      Object.entries(filterOptions || {}).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return;
        params.set(key, String(value));
      });

      navigate(`/filter?${params.toString()}`);
    } catch (err) {
      console.error('Navbar: Error preparing filter navigation:', err);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-navbar-custom backdrop-blur-xl border-b border-navbar-border shadow-lg transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent tracking-widest drop-shadow-[0_0_12px_rgba(239,68,68,0.25)] hover:scale-105 transition-all duration-300"
          >
            FILMREVIEW
          </Link>
          <SearchBar onOpenFilter={handleOpen} />

          <div className="flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
              title={theme === 'dark' ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-500 animate-[spin_10s_linear_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <AdminButton />
            <UserProfile />
            <UserButton/>
          </div>
        </div>
      </nav>

      <FilterDialog isOpen={isFilterOpen} onClose={handleClose} onFilter={handleFilter} />
    </>
  );
};

export default Navbar;