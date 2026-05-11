import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, getMovieReviews, submitReview } from '../services/api';
import Navbar from '../components/Navbar';
import { Star, Clock, Calendar, Share2, Plus, MessageSquare, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Review Form State
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLoggedIn = !!localStorage.getItem('access_token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [movieRes, reviewsRes] = await Promise.all([
          getMovieById(id),
          getMovieReviews(id)
        ]);
        setMovie(movieRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error("Error fetching movie details", err);
        // If not found, could redirect to 404, but for now we just show error state
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Vui lòng đăng nhập để gửi đánh giá!');
      navigate('/login');
      return;
    }
    if (rating === 0) {
      alert('Vui lòng chọn số sao đánh giá!');
      return;
    }
    if (!comment.trim()) {
      alert('Vui lòng nhập nội dung đánh giá!');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await submitReview(id, rating, comment);
      setReviews([res.data, ...reviews]);
      setRating(0);
      setComment('');
    } catch (error) {
      alert('Có lỗi xảy ra khi gửi đánh giá');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getImageUrl = (path, isBackdrop = false) => {
    if (!path) return 'https://via.placeholder.com/1920x1080?text=No+Image';
    if (path.startsWith('http')) return path;
    return isBackdrop 
      ? `https://image.tmdb.org/t/p/original${path}`
      : `https://image.tmdb.org/t/p/w500${path}`;
  };

  const getSentimentConfig = (sentiment) => {
    switch(sentiment) {
      case 'positive': return { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: <ThumbsUp className="w-4 h-4 mr-1" />, label: 'Tích cực' };
      case 'negative': return { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: <ThumbsDown className="w-4 h-4 mr-1" />, label: 'Tiêu cực' };
      default: return { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', icon: <Minus className="w-4 h-4 mr-1" />, label: 'Trung lập' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cinema-black font-sans pb-16 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-cinema-red text-2xl tracking-widest font-bold">ĐANG TẢI...</div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-cinema-black font-sans pb-16 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-white text-xl">Không tìm thấy thông tin phim.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cinema-black text-white font-sans pb-24">
      <Navbar />

      {/* Hero Detail Section */}
      <div className="relative w-full h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img 
            src={getImageUrl(movie.backdrop_path, true)} 
            alt={movie.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-black via-cinema-black/90 to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center pt-20">
          <div className="flex flex-col md:flex-row gap-10 items-start w-full">
            {/* Poster */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="w-48 md:w-72 flex-shrink-0 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(229,9,20,0.3)] border border-white/10 hidden md:block"
            >
              <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="w-full h-auto object-cover" />
            </motion.div>

            {/* Info */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-300">
                <span className="flex items-center text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  {movie.vote_average?.toFixed(1)} Điểm
                </span>
                <span className="flex items-center bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  {movie.release_date?.substring(0, 4)}
                </span>
                <span className="flex items-center bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  {movie.runtime} phút
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {movie.genres?.map(g => (
                  <span key={g.id} className="text-xs px-3 py-1 bg-cinema-red/20 text-cinema-red border border-cinema-red/30 rounded-full">
                    {g.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                {movie.overview}
              </p>

              <div className="flex items-center gap-4 pt-6">
                <button className="flex items-center bg-cinema-red text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg active:scale-95">
                  <Plus className="w-5 h-5 mr-2" /> Thêm Watchlist
                </button>
                <button className="flex items-center bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 border border-white/10 transition-all shadow-lg active:scale-95">
                  <Share2 className="w-5 h-5 mr-2" /> Chia sẻ
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content Area: Reviews */}
      <div className="container mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Review List Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-3xl font-bold flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-cinema-red" />
                Đánh giá & Bình luận
              </h2>
              <span className="text-gray-400">{reviews.length} đánh giá</span>
            </div>

            {/* Write Review Form */}
            <div className="bg-cinema-zinc/40 p-6 rounded-2xl border border-white/5 shadow-xl">
              <h3 className="font-semibold mb-4 text-lg">Gửi đánh giá của bạn</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="focus:outline-none transition-transform hover:scale-110"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          star <= (hoverRating || rating) 
                            ? 'text-yellow-500 fill-current drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-sm font-medium text-gray-400 w-12">{rating > 0 ? `${rating}/10` : ''}</span>
                </div>
                
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Bạn nghĩ gì về bộ phim này? (AI sẽ phân tích cảm xúc bình luận của bạn)"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cinema-red focus:ring-1 focus:ring-cinema-red transition-all min-h-[120px] resize-y"
                ></textarea>
                
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-cinema-red hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi Đánh Giá'}
                  </button>
                </div>
              </form>
            </div>

            {/* Reviews List */}
            <div className="space-y-6 pt-4">
              {reviews.length === 0 ? (
                <div className="text-center text-gray-400 py-8">Chưa có bình luận nào. Hãy là người đầu tiên đánh giá!</div>
              ) : (
                reviews.map((review) => {
                  const sentiment = getSentimentConfig(review.sentiment);
                  return (
                    <motion.div 
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cinema-red to-orange-500 flex items-center justify-center font-bold text-lg shadow-lg">
                            {review.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold">{review.username}</p>
                            <p className="text-xs text-gray-400">{review.created_at}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="flex items-center text-yellow-500 font-bold bg-yellow-500/10 px-2 py-1 rounded-md text-sm">
                            <Star className="w-3 h-3 mr-1 fill-current" /> {review.rating}/10
                          </span>
                          {/* AI Sentiment Label */}
                          <div className={`flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${sentiment.color}`}>
                            {sentiment.icon} {sentiment.label}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5 italic">
                        "{review.comment}"
                      </p>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>

          {/* Sidebar Area (e.g., Cast, Related Movies - Placeholder for future) */}
          <div className="space-y-8">
            <div className="bg-cinema-zinc/30 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Thông tin thêm</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-400">Trạng thái</span>
                  <span className="font-medium text-white">Đã phát hành</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Ngôn ngữ gốc</span>
                  <span className="font-medium text-white">Tiếng Anh</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Kinh phí</span>
                  <span className="font-medium text-white">$200,000,000</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
