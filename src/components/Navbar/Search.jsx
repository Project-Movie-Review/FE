import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8 relative hidden md:block">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Nhập tên phim bạn muốn tìm..."
                className="w-full bg-cinema-zinc/50 text-white pl-12 pr-4 py-2.5 rounded-full border border-white/10 focus:border-cinema-red focus:ring-1 focus:ring-cinema-red outline-none transition-all shadow-inner"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </form>
    );
};

export default SearchBar;