import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar/index';
import MovieCard from '../components/MovieCard/index';
import Pagination from '../components/Pagination';
import { filterMovies, getAllGenres } from '../services/api';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

const FilterPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const year = searchParams.get('year') || '';
  const genresParam = searchParams.get('genres') || '';
  const page = Number(searchParams.get('page') || '1');
  const sortBy = searchParams.get('sortBy') || 'popularity';

  const selectedGenres = genresParam ? genresParam.split(',') : [];

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Mock data cho bộ lọc
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await getAllGenres();
        setGenres(data || []);
      } catch (err) {
        console.error('Lỗi khi lấy thể loại:', err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchFilteredMovies = async () => {
      setLoading(true);
      try {
        // filterMovies nhận genreIds là mảng
        const { data } = await filterMovies(0, 10, selectedGenres, year, year, sortBy, 'desc');
        const items = data?.items ?? data?.item ?? [];
        const paginationMeta = data?.paginationMeta ?? data?.pagnition ?? data?.pagination ?? null;

        setMovies(Array.isArray(items) ? items : []);
        setTotalPages(Number(paginationMeta?.totalPages ?? data?.totalPages ?? 1));
      } catch (err) {
        console.error('Lỗi khi lọc phim:', err);
        setMovies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredMovies();
  }, [genresParam, year, page, sortBy]);

  const handleGenreToggle = (genreId) => {
    const newParams = new URLSearchParams(searchParams);
    let newGenres = [...selectedGenres];

    if (newGenres.includes(genreId)) {
      newGenres = newGenres.filter(id => id !== genreId);
    } else {
      newGenres.push(genreId);
    }

    if (newGenres.length > 0) {
      newParams.set('genres', newGenres.join(','));
    } else {
      newParams.delete('genres');
    }
    
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cinema-black text-white font-sans">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 pt-28">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Bộ Lọc */}
          <aside className="w-full lg:w-1/4 space-y-8">
            <div className="bg-cinema-zinc/30 rounded-2xl p-6 border border-white/10 backdrop-blur-md sticky top-28">
              <div className="flex items-center space-x-3 mb-8 border-b border-white/10 pb-4">
                <SlidersHorizontal className="text-cinema-red w-6 h-6" />
                <h2 className="text-xl font-bold uppercase tracking-wider">Bộ lọc phim</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-400 flex items-center justify-between">
                    THỂ LOẠI
                    <ChevronDown className="w-4 h-4" />
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {genres.map(g => (
                      <button
                        key={g.id}
                        onClick={() => handleGenreToggle(g.id)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 border ${selectedGenres.includes(g.id.toString()) ? 'bg-cinema-red border-cinema-red text-white shadow-lg shadow-cinema-red/20 scale-[1.02]' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/10'}`}
                      >
                        {g.name}
                      </button>
                    ))}
                  </div>
                </div>
                </div>

                {/* Năm phát hành */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <label className="text-sm font-semibold text-gray-400">NĂM PHÁT HÀNH</label>
                  <select 
                    value={year} 
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all text-sm appearance-none"
                  >
                    <option value="">Tất cả các năm</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>

                {/* Sắp xếp */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <label className="text-sm font-semibold text-gray-400">SẮP XẾP THEO</label>
                  <select 
                    value={sortBy} 
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cinema-red transition-all text-sm appearance-none"
                  >
                    <option value="popularity">Phổ biến nhất</option>
                    <option value="vote_average">Điểm đánh giá</option>
                    <option value="release_date">Mới nhất</option>
                  </select>
                </div>
                
                <button 
                   onClick={() => setSearchParams({})}
                   className="w-full py-3 text-xs font-semibold text-gray-500 hover:text-white transition-colors underline uppercase tracking-widest pt-4"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            </div>
          </aside>

          {/* Danh sách kết quả */}
          <main className="w-full lg:w-3/4">
             <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold flex items-center space-x-3">
                   <span className="w-2 h-6 bg-cinema-red rounded-full"></span>
                   <span>Danh sách phim</span>
                </h1>
                <p className="text-gray-500 text-sm">{movies.length} kết quả được tìm thấy</p>
             </div>

             {loading ? (
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                 {Array.from({ length: 8 }).map((_, i) => (
                   <div key={i} className="aspect-[2/3] w-full bg-white/5 animate-pulse rounded-2xl border border-white/5"></div>
                 ))}
               </div>
             ) : movies.length > 0 ? (
               <>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                   {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                 </div>
                 <div className="mt-16">
                    <Pagination 
                      currentPage={page} 
                      totalPages={totalPages} 
                      onPageChange={handlePageChange} 
                    />
                 </div>
               </>
             ) : (
               <div className="bg-cinema-zinc/10 border border-white/5 rounded-3xl p-20 text-center">
                 <Filter className="w-16 h-16 text-gray-700 mx-auto mb-6" />
                 <h3 className="text-xl font-semibold mb-2">Không tìm thấy phim</h3>
                 <p className="text-gray-500">Hãy thử thay đổi các tùy chọn bộ lọc để tìm thấy bộ phim ưng ý nhé.</p>
               </div>
             )}
          </main>

        </div>
      </div>
    </div>
  );
};

export default FilterPage;
