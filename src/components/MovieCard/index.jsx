import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const getImageUrl = (path) => {
    if (!path) return 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500&auto=format&fit=crop';
    return path.startsWith('http') ? path : `https://image.tmdb.org/t/p/w500${path}`;
  };

  return (
    <Link to={`/movie/${movie.id}`} className="group relative block overflow-hidden rounded-xl bg-cinema-zinc transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(229,9,20,0.3)]">
      <div className="aspect-[2/3] w-full">
        <img 
          src={getImageUrl(movie.poster_path)} 

          alt={movie.title} 
          className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-60"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="text-white font-semibold truncate text-lg">{movie.title}</h3>
        <div className="flex items-center mt-2 space-x-2 text-sm text-gray-300">
          <span className="flex items-center text-yellow-500 font-medium">
            <Star className="w-4 h-4 mr-1 fill-current" />
            {movie.rating?.toFixed(1) || 'TBA'}
          </span>
          <span>•</span>
          <span>{movie.releaseDate ? movie.releaseDate : 'TBA'}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;