import React from 'react';
import { Play, Plus, Star } from 'lucide-react';

const HeroSection = ({ movie }) => {
  if (!movie) return null;
  
  return (
    <div className="relative w-full h-[75vh] min-h-[500px]">
      <div className="absolute inset-0">
        <img 
          src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : 'https://via.placeholder.com/1920x1080?text=No+Backdrop'} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-black via-cinema-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-transparent to-transparent"></div>
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl space-y-6 animate-slide-up-fade">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">{movie.title}</h1>
          <div className="flex items-center space-x-4 text-base text-gray-300 font-medium">
            <span className="flex items-center text-yellow-500">
              <Star className="w-5 h-5 mr-1 fill-current" />
              {movie.vote_average?.toFixed(1)} Điểm
            </span>
            <span>|</span>
            <span>{movie.release_date?.substring(0, 4)}</span>
          </div>
          <p className="text-gray-300 text-lg line-clamp-3 leading-relaxed">
            {movie.overview || 'Đang cập nhật mô tả cho bộ phim này...'}
          </p>
          <div className="flex items-center space-x-4 pt-4">
            <button className="flex items-center bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors shadow-lg active:scale-95">
              <Play className="w-5 h-5 mr-2 fill-current" /> Phát ngay
            </button>
            <button className="flex items-center bg-[#27272a]/70 backdrop-blur-md text-white px-8 py-3 rounded-lg font-bold border border-white/20 hover:bg-[#27272a] transition-colors shadow-lg active:scale-95">
              <Plus className="w-5 h-5 mr-2" /> Thêm Danh Sách
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;