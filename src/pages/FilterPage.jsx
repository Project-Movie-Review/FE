import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar/index';
import MovieCard from '../components/MovieCard/index';
import Pagination from '../components/Pagination';
import { filterMovies } from '../services/api';

const FilterPage = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const page = Number(searchParams.get('page') || '1');

  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      try {
        const params = Object.fromEntries(searchParams.entries());
        // convert numeric params
        if (params.minRating) params.minRating = Number(params.minRating);
        if (params.maxRating) params.maxRating = Number(params.maxRating);
        if (params.page) params.page = Number(params.page);
        const resp = await filterMovies(params);
        // server wraps payload under `data` key: { success, ..., data: { item: [...], pagination: {...} } }
        const payload = resp?.data ?? resp;
        const items = payload?.item ?? payload?.items ?? [];
        const paginationMeta = payload?.pagination ?? payload?.paginationMeta ?? null;

        setMovies(Array.isArray(items) ? items : []);
        setTotalPages(Number(paginationMeta?.totalPages ?? payload?.totalPages ?? 1));
      } catch (err) {
        console.error('Lỗi khi lọc phim:', err);
        setMovies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchFiltered();
  }, [searchParams]);

  console.log(movies)

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    window.location.search = newParams.toString();
  };

  return (
    <div className="min-h-screen bg-cinema-black font-sans pb-16">
      <Navbar />
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold text-white mb-6">Kết quả lọc</h1>

        {loading ? (
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
            <div className="mt-12">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        ) : (
          <div className="text-center py-32 text-gray-500 text-xl font-medium">Không tìm thấy bộ phim phù hợp.</div>
        )}
      </div>
    </div>
  );
};

export default FilterPage;
