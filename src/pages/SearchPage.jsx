import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar/index';
import MovieCard from '../components/MovieCard/index';
import Pagination from '../components/Pagination';
import { searchMovies } from '../services/api';
import noPoster from '../assets/noPoster.png';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page') || '1');

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      try {
        const { data } = await searchMovies(query, page);
        const items = data?.items ?? data?.item ?? [];
        const paginationMeta = data?.paginationMeta ?? data?.pagnition ?? data?.pagination ?? null;

        setMovies(Array.isArray(items) ? items : []);
        const rawPages = Number(paginationMeta?.totalPages ?? data?.totalPages ?? 1);
        setTotalPages(Math.min(rawPages, 500));
      } catch (err) {
        console.error('Lỗi khi tìm kiếm:', err);
        setMovies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    
    if (query || page > 1) {
      fetchSearch();
    }
  }, [query, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', newPage.toString());
      setSearchParams(newParams);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-cinema-black font-sans pb-16">
      <Navbar />
      
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold text-white mb-6">
          Kết quả cho: <span className="text-cinema-red">"{query}"</span>
        </h1>

        {!query  ? (
          <div className="text-center py-32 text-gray-500 text-xl font-medium">Không tìm thấy bộ phim nào phù hợp.</div>
        ) : loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] w-full bg-[#27272a]/50 animate-pulse rounded-xl border border-white/5"></div>
            ))}
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((movie) => movie.poster ? <MovieCard key={movie.id} movie={movie} /> : <MovieCard key={movie.id} movie={{ ...movie, poster: noPoster }} />)}
            </div>
            <div className="mt-12">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-32 text-gray-500 text-xl font-medium">Không tìm thấy bộ phim nào phù hợp.</div>
        )}
      </div>
    </div>
  );
};
export default SearchPage;