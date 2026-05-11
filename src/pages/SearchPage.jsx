// Tách phần filter ra phần tìm kiếm nâng cao, tôi có api movie/filter để làm phần đó  rồi

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/api';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1');
  // const year = searchParams.get('year') || '';
  // const genre = searchParams.get('genre') || '';

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Mock dữ liệu bộ lọc
  // const currentYear = new Date().getFullYear();
  // const years = Array.from({ length: currentYear - 1999 }, (_, i) => currentYear - i);
  // const genres = [
  //   { id: '28', name: 'Hành động' },
  //   { id: '35', name: 'Hài' },
  //   { id: '18', name: 'Tâm lý' },
  //   { id: '878', name: 'Viễn tưởng' },
  //   { id: '27', name: 'Kinh dị' },
  // ];

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      try {
        const { data } = await searchMovies(query, page);
        const {item, pagnition} = data;
        setMovies(item || []);
        setTotalPages(pagnition?.totalPages || 1);
      } catch (err) {
        console.error('Lỗi khi tìm kiếm:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (query || page > 1) {
      fetchSearch();
    }
  }, [query, page]);

  // const handleFilterChange = (key, value) => {
  //   const newParams = new URLSearchParams(searchParams);
  //   if (value) newParams.set(key, value);
  //   else newParams.delete(key);
    
  //   newParams.set('page', '1'); // Reset page về 1 khi lọc
  //   setSearchParams(newParams);
  // };

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

       {/* Thanh Bộ Lọc
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-[#27272a]/50 rounded-lg border border-white/10 backdrop-blur-md">
          <select value={year} onChange={(e) => handleFilterChange('year', e.target.value)} className="bg-cinema-black border border-white/20 text-white p-3 rounded-lg outline-none focus:border-cinema-red transition">
            <option value="">Tất cả năm phát hành</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select value={genre} onChange={(e) => handleFilterChange('genre', e.target.value)} className="bg-cinema-black border border-white/20 text-white p-3 rounded-lg outline-none focus:border-cinema-red transition">
            <option value="">Tất cả thể loại</option>
            {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select> 
        </div>  */}

        {/* Hiển thị Dữ liệu & Loading Skeleton */}
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
              {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-6 mt-12">
                <button disabled={page === 1} onClick={() => handlePageChange(page - 1)} className="px-6 py-3 bg-cinema-zinc text-white font-bold rounded-lg disabled:opacity-30 hover:bg-zinc-700 transition">Trang trước</button>
                <span className="text-gray-400 font-medium">Trang {page} / {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)} className="px-6 py-3 bg-cinema-zinc text-white font-bold rounded-lg disabled:opacity-30 hover:bg-zinc-700 transition">Trang sau</button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-32 text-gray-500 text-xl font-medium">Không tìm thấy bộ phim nào phù hợp.</div>
        )}
      </div>
    </div>
  );
};
export default SearchPage;