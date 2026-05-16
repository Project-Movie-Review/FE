import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/index';
import { getTrendingMovies} from '../services/api';
import FilterDialog from '../components/FilterDialog';
import HeroSection from '../components/HeroSection/index';
import MovieSection from '../components/MovieSection';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await getTrendingMovies();
        setMovies(data || []);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách phim:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);
  
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
      console.error('Error preparing filter navigation:', err);
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  }

  const heroMovies = movies.slice(0, 5);
  // Tách mảng để hiển thị theo mục
  const trendingList = movies.slice(0, 10);
  const topRatedList = movies.slice(10, 20);

  return (
    <div className="min-h-screen bg-cinema-black font-sans pb-16">
      <Navbar onOpenFilter={() => setIsFilterOpen(true)} />
      <FilterDialog isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} onFilter={handleFilter} />
      
      {loading ? (
        <div className="w-full h-[75vh] bg-cinema-zinc/30 animate-pulse flex items-center justify-center">
          <div className="text-white text-xl tracking-widest">ĐANG TẢI...</div>
        </div>
      ) : (
        <>
          <HeroSection movies={heroMovies} onClick={handleMovieClick} />
          <div className="container mx-auto px-4 mt-12 space-y-16">
            <MovieSection title="Phim Thịnh Hành" movies={trendingList} />
            {topRatedList.length > 0 && (
              <MovieSection title="Có thể bạn sẽ thích" movies={topRatedList} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;