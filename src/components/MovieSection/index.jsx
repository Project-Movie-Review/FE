import MovieCard from "../MovieCard";

const MovieSection = ({ title, movies, onRemove }) => {
  const hasMovies = movies?.length > 0;

  return (
    <section>
      <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cinema-red pl-4">
        {title}
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
    </section>
  );
};

export default MovieSection;