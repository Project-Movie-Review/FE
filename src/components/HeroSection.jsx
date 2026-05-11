import React, { useState, useEffect } from 'react';
import { Play, Plus, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!movies || movies.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 5000); // Tự động chuyển sau 5 giây
    return () => clearInterval(timer);
  }, [movies, currentIndex]);

  if (!movies || movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  const getImageUrl = (path) => {
    if (!path) return 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1920&auto=format&fit=crop';
    return path.startsWith('http') ? path : `https://image.tmdb.org/t/p/original${path}`;
  };

  return (
    <div className="relative w-full h-[75vh] min-h-[600px] overflow-hidden group">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img 
            src={getImageUrl(currentMovie.backdrop_path)} 
            alt={currentMovie.title}
            className="w-full h-full object-cover scale-105"
            style={{ filter: 'brightness(0.6)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-black via-cinema-black/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-transparent to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-20"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-20"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
      
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentMovie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">{currentMovie.title}</h1>
            <div className="flex items-center space-x-4 text-base text-gray-200 font-medium drop-shadow-md">
              <span className="flex items-center text-yellow-500">
                <Star className="w-5 h-5 mr-1 fill-current" />
                {currentMovie.vote_average?.toFixed(1)} Điểm
              </span>
              <span>|</span>
              <span>{currentMovie.release_date?.substring(0, 4)}</span>
            </div>
            <p className="text-gray-200 text-lg line-clamp-3 leading-relaxed drop-shadow-md">
              {currentMovie.overview || 'Đang cập nhật mô tả cho bộ phim này...'}
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <button className="flex items-center bg-cinema-red text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg active:scale-95">
                <Play className="w-5 h-5 mr-2 fill-current" /> Phát ngay
              </button>
              <button className="flex items-center bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-lg font-bold border border-white/20 hover:bg-white/20 transition-colors shadow-lg active:scale-95">
                <Plus className="w-5 h-5 mr-2" /> Thêm Danh Sách
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {movies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-cinema-red' : 'w-2 bg-white/50 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;