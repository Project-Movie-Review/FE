import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Users, Plus, Minus} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const placeholderPoster = 'https://via.placeholder.com/500x750?text=No+Poster';
const placeholderBackdrop = 'https://via.placeholder.com/1920x1080?text=No+Image';

const MovieHeader = ({
  movie,
  reviewAvg,
  totalReviewItems = 0,
  isInWatchlist,
  isLoadingWatchlist,
  onToggleWatchlist,
  getMediaUrl,
}) => {
  const navigate = useNavigate();

  const backdropUrl = movie.backdrop || movie.backdrop_path;
  const posterUrl = movie.poster || movie.poster_path;
  const movieYear = movie.release_date ? String(movie.release_date).slice(-4) : 'Chưa rõ';
  const hasVotes = movie.vote_count && movie.vote_count > 0;
  const tmdbRating = hasVotes ? `${Number(movie.vote_average ?? 0).toFixed(1)} / 10` : 'TBA';

  const handleScrollToReviews = () => {
    const el = document.getElementById('review-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[500px] w-full overflow-hidden bg-header-custom">
      <div className="absolute inset-0">
        <img
          src={getMediaUrl(backdropUrl, placeholderBackdrop)}
          alt={movie.title}
          className="h-full w-full object-cover opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t-custom" />
        <div className="absolute inset-0 bg-gradient-to-r-custom" />
      </div>

      <div className="relative container mx-auto flex h-full items-center px-4 pt-24">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-[280px_minmax(0,1fr)]">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="hidden overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(229,9,20,0.25)] md:block"
          >
            <img
              src={getMediaUrl(posterUrl, placeholderPoster)}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Navigation & Tags */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition-colors hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
                Quay lại
              </button>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                {movie.status || 'Unknown'}
              </span>
              {movie.tagline ? (
                <span className="rounded-full border border-cinema-red/30 bg-cinema-red/10 px-3 py-1.5 text-cinema-red">
                  {movie.tagline}
                </span>
              ) : null}
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 md:text-6xl">
                {movie.title}
              </h1>
              {movie.original_title && movie.original_title !== movie.title ? (
                <p className="text-lg text-white/55">{movie.original_title}</p>
              ) : null}
            </div>

            {/* Movie Info Tags */}
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-300">
              {/* TMDB Rating */}
              <span className="flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-blue-400 font-semibold shadow-sm">
                <span className="mr-1.5 text-[10px] bg-blue-500 text-white px-1 py-0.5 rounded font-black">TMDB</span>
                {tmdbRating}
              </span>

              {/* Web Rating / Call to action */}
              {reviewAvg && Number(reviewAvg) > 0 ? (
                <span className="flex items-center rounded-full border border-cinema-red/30 bg-cinema-red/10 px-3 py-1.5 text-cinema-red font-semibold shadow-sm">
                  <span className="mr-1.5 text-[10px] bg-cinema-red text-white px-1 py-0.5 rounded font-black">WEB</span>
                  {Number(reviewAvg).toFixed(1)} / 10 ({totalReviewItems} lượt)
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleScrollToReviews}
                  className="flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/5 px-3 py-1.5 text-yellow-500 font-semibold shadow-sm transition-all hover:bg-yellow-500/20 hover:scale-105 active:scale-95 cursor-pointer animate-pulse"
                >
                  <span className="mr-1.5 text-[10px] bg-yellow-500 text-black px-1 py-0.5 rounded font-black">WEB</span>
                  ✍️ Viết đánh giá đầu tiên
                </button>
              )}

              <span className="flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                {movieYear}
              </span>
              <span className="flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <Clock className="mr-2 h-4 w-4 text-gray-400" />
                {movie.runtime ? `${movie.runtime} phút` : 'Chưa có runtime'}
              </span>
              <span className="flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5" title="Tổng số lượt bình chọn từ hệ thống điện ảnh toàn cầu TMDb">
                <Users className="mr-2 h-4 w-4 text-gray-400" />
                {movie.vote_count ?? 0} vote toàn cầu (TMDb)
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-cinema-red/30 bg-cinema-red/15 px-3 py-1 text-xs text-cinema-red"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p className="max-w-4xl text-lg leading-relaxed text-gray-300">
              {movie.overview || 'Chưa có mô tả cho phim này.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onToggleWatchlist}
                disabled={isLoadingWatchlist}
                className={`inline-flex items-center rounded-xl px-5 py-3 font-bold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${
                  isInWatchlist
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isInWatchlist ? (
                  <>
                    <Minus className="mr-2 h-5 w-5" />
                    Xóa khỏi watchlist
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-5 w-5" />
                    Thêm watchlist
                  </>
                )}
              </button>   
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MovieHeader;
