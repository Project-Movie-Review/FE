import MovieCard from "../MovieCard";

const MovieSection = ({ title, movies }) => {
  if (!movies?.length) return null;

  return (
    <section>
      <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cinema-red pl-4">
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;