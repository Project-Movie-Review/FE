import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/index';
import { getTrendingMovies, filterMovies } from '../services/api';
import HeroSection from '../components/HeroSection/index';
import MovieSection from '../components/MovieSection';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        // Fetch trending, top rated, and latest releases in parallel for peak performance
        const [trendingRes, topRatedRes, latestRes] = await Promise.all([
          getTrendingMovies(),
          filterMovies({ sortBy: 'vote_average', sortOrder: 'desc', limit: 10 }),
          filterMovies({ sortBy: 'release_date', sortOrder: 'desc', limit: 10 })
        ]);

        setTrendingMovies(trendingRes?.data || trendingRes || []);

        const topRatedPayload = topRatedRes?.data ?? topRatedRes;
        const topRatedItems = (topRatedPayload?.item ?? topRatedPayload?.items ?? []).slice(0, 10);
        setTopRatedMovies(topRatedItems);

        const latestPayload = latestRes?.data ?? latestRes;
        const latestItems = (latestPayload?.item ?? latestPayload?.items ?? []).slice(0, 10);
        setLatestMovies(latestItems);
      } catch (err) {
        console.error('Lỗi khi tải danh sách phim trang chủ:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllMovies();
  }, []);
  

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  }

  const heroMovies = trendingMovies.slice(0, 5);
  const trendingList = trendingMovies.slice(0, 10);

  return (
    <div className="min-h-screen bg-cinema-black font-sans pb-16">
      <Navbar />
      
      {loading ? (
        <div className="w-full h-[75vh] bg-cinema-zinc/30 animate-pulse flex items-center justify-center">
          <div className="text-white text-xl tracking-widest">ĐANG TẢI...</div>
        </div>
      ) : (
        <>
          <HeroSection movies={heroMovies} onClick={handleMovieClick} />
          <div className="container mx-auto px-4 mt-12 space-y-16">
            <MovieSection title="Phim Thịnh Hành" movies={trendingList} />
            {topRatedMovies.length > 0 && (
              <MovieSection title="Phim Điểm Cao Tuyển Chọn" movies={topRatedMovies} />
            )}
            {latestMovies.length > 0 && (
              <MovieSection title="Mới Ra Mắt" movies={latestMovies} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;