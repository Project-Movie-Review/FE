import { Star, Calendar, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import  noPoster from '../../assets/noPoster.png';

const MovieCard = ({ movie, onRemove }) => {
  const displayRating =
    movie.rating && !isNaN(Number(movie.rating))
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
        className="relative block overflow-hidden rounded-2xl bg-cinema-zinc transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(229,9,20,0.35)]"
      >
        {/* Poster */}
        <div className="aspect-[2/3] w-full overflow-hidden">
          <img
            src={movie.poster || movie.backdrop || noPoster}
            alt={movie.title}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/70 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-300 flex-wrap">
            <span className="flex items-center text-yellow-400 font-semibold shrink-0">
              <Star className="w-4 h-4 mr-1 fill-current" />
              {displayRating}
            </span>
            <span className='flex items-center gap-1 text-gray-400 text-xs'>
              <Calendar className="w-4 h-4 mr-1" />
              <span className="truncate">{releaseYear}</span>
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