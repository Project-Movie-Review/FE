import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import MovieCard from '../components/MovieCard';
import { getTrendingMovies } from '../services/api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await getTrendingMovies();
        setMovies(data.results || data || []);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách phim:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const heroMovie = movies.length > 0 ? movies[0] : null;
  // Tách mảng để hiển thị theo mục
  const trendingList = movies.slice(1, 11);
  const topRatedList = movies.slice(11, 21);

  return (
    <div className="min-h-screen bg-cinema-black font-sans pb-16">
      <Navbar />
      
      {loading ? (
        <div className="w-full h-[75vh] bg-cinema-zinc/30 animate-pulse flex items-center justify-center">
          <div className="text-white text-xl tracking-widest">ĐANG TẢI...</div>
        </div>
      ) : (
        <>
          <HeroSection movie={heroMovie} />
          
          <div className="container mx-auto px-4 mt-12 space-y-16">
            <section>
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cinema-red pl-4 tracking-wide">Phim Thịnh Hành</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {trendingList.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
              </div>
            </section>

            {topRatedList.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cinema-red pl-4 tracking-wide">Đánh Giá Cao</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {topRatedList.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
                </div>
              </section>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;