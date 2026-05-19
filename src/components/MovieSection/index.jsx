import MovieCard from "../MovieCard";

const MovieSection = ({ title, movies, onRemove }) => {
  const hasMovies = movies?.length > 0;

  return (
    <section className="relative overflow-hidden bg-white/[0.01] border border-white/[0.03] backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/[0.06] hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
      {/* Decorative ambient background glows */}
      <div className="absolute -right-24 -top-24 w-72 h-72 bg-cinema-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-gray-300 bg-clip-text text-transparent mb-8 border-l-4 border-cinema-red pl-4 tracking-tight flex items-center gap-3">
          <span>{title}</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-cinema-red/30 via-cinema-red/5 to-transparent ml-4 rounded hidden md:block" />
        </h2>

        {hasMovies ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onRemove={onRemove} />
            ))}
          </div>
        ) : (
          <div className="bg-cinema-zinc/10 border border-white/5 rounded-2xl p-12 text-center">
            <p className="text-gray-400 text-lg">Chưa có bộ phim nào trong danh sách này.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieSection;