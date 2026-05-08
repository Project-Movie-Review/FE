import { Link } from 'react-router-dom';
import SearchBar from './Search';
import UserProfile from './User';
import UserButton from './UserButton';

const Navbar = () => {

  return (
    <nav className="sticky top-0 z-50 w-full bg-cinema-black/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-cinema-red tracking-wider">FILMREVIEW</Link>
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