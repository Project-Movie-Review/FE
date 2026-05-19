import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from './Search';
import UserProfile from './User';
import UserButton from './UserButton';
import AdminButton from './AdminButton';
import FilterDialog from '../FilterDialog';

const Navbar = ({ onOpenFilter: externalOpenFilter }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

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
      <nav className="sticky top-0 z-50 w-full bg-[#07070a]/60 backdrop-blur-xl border-b border-white/5 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent tracking-widest drop-shadow-[0_0_12px_rgba(239,68,68,0.25)] hover:scale-105 transition-all duration-300"
          >
            FILMREVIEW
          </Link>
          <SearchBar onOpenFilter={handleOpen} />

          <div className="flex items-center space-x-6">
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