import { Star, Calendar, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import  noPoster from '../../assets/noPoster.png';

const MovieCard = ({ movie, onRemove }) => {
  const displayRating =
    movie.rating && !isNaN(Number(movie.rating)) && Number(movie.rating) > 0
      ? Number(movie.rating).toFixed(1)
      : 'TBA';

  const releaseYear = movie.releaseDate
    ? movie.releaseDate
    : 'TBA';

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) onRemove(movie.id);
  };

  return (
    <div className="relative group">
      <Link
        to={`/movie/${movie.id}`}
        className="relative block overflow-hidden rounded-2xl border border-white/5 bg-[#0e0e15]/90 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:border-cinema-red/30 hover:shadow-[0_15px_35px_rgba(229,9,20,0.25)]"
      >
        {/* Poster Wrapper */}
        <div className="aspect-[2/3] w-full overflow-hidden relative">
          <img
            src={movie.poster || movie.backdrop || noPoster}
            alt={movie.title}
            className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-75"
          />
          {/* Glowing Translucent Rating Badge (Persistent on Image) */}
          <div className="absolute top-3 left-3 bg-[#07070a]/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md z-10">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0 animate-pulse-slow" />
            <span className="text-xs font-bold text-yellow-400">{displayRating}</span>
          </div>
        </div>

        {/* Elegant Bottom Info Area (Persistent Metadata) */}
        <div className="p-4 bg-[#0e0e15]/95 border-t border-white/5 flex flex-col justify-between h-[84px]">
          <h3 className="text-white font-semibold text-sm md:text-base leading-tight truncate group-hover:text-cinema-red transition-colors duration-300">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
              <Calendar className="w-3.5 h-3.5 text-gray-500 shrink-0" />
              <span className="truncate max-w-[100px]">{releaseYear}</span>
            </span>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-cinema-red opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              Chi tiết →
            </span>
          </div>
        </div>
      </Link>

      {/* Remove Button */}
      {onRemove && (
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 z-20 bg-cinema-red text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-95"
          title="Xóa khỏi danh sách yêu thích"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default MovieCard;