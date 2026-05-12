const HeroIndicators = ({
  movies,
  current,
  setCurrent,
}) => {
  return (
    <div className="absolute bottom-8 right-12 z-20 flex items-center gap-3">
      {movies.map((movie, idx) => (
        <button
          key={movie.id}
          onClick={() => setCurrent(idx)}
          className={`
            h-1.5 rounded-full transition-all duration-300
            ${
              idx === current
                ? "w-8 bg-cinema-red"
                : "w-4 bg-white/40 hover:bg-white/70"
            }
          `}
        />
      ))}
    </div>
  );
};

export default HeroIndicators;