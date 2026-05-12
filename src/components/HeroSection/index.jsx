import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = ({ movies }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!movies || movies.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % movies.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + movies.length) % movies.length);

  const getImageUrl = (path) => {
    if (!path) return 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop';
    return path.startsWith('http') ? path : `https://image.tmdb.org/t/p/original${path}`;
  };

  return (
    <div className="relative w-full h-[75vh] min-h-[500px] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={movies[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0">
            <img
              src={getImageUrl(movies[current].backdrop_path)}
              alt={movies[current].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cinema-black via-cinema-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl space-y-6">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight"
              >
                {movies[current].title}
              </motion.h1>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-4 text-gray-300"
              >
                <span className="text-yellow-500 font-bold text-lg">★ {movies[current].vote_average?.toFixed(1)}</span>
                <span>•</span>
                <span>{movies[current].release_date?.split('-')[0]}</span>
              </motion.div>

              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 text-lg md:text-xl line-clamp-3 leading-relaxed"
              >
                {movies[current].overview}
              </motion.p>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center space-x-4 pt-4"
              >
                <Link 
                  to={`/movie/${movies[current].id}`}
                  className="flex items-center px-8 py-3 bg-cinema-red text-white rounded-lg font-bold hover:bg-red-700 transition-all transform hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" /> XEM NGAY
                </Link>
                <Link 
                  to={`/movie/${movies[current].id}`}
                  className="flex items-center px-8 py-3 bg-white/20 text-white backdrop-blur-md rounded-lg font-bold hover:bg-white/30 transition-all"
                >
                  <Info className="w-5 h-5 mr-2" /> CHI TIẾT
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/50 text-white transition-all backdrop-blur-sm"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/50 text-white transition-all backdrop-blur-sm"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 right-12 flex space-x-3">
        {movies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              idx === current ? 'w-8 bg-cinema-red' : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;