import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieDetail, getMovieReviews, submitReview, toggleWatchlist, getUserWatchlist } from '../services/api';
import Navbar from '../components/Navbar/index';
import MovieHeader from '../components/MovieDetail/MovieHeader';
import ReviewForm from '../components/MovieDetail/ReviewForm';
import ReviewList from '../components/MovieDetail/ReviewList';
import MovieInfo from '../components/MovieDetail/MovieInfo';
import { MessageSquare, Star, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoadingWatchlist, setIsLoadingWatchlist] = useState(false);
  const [reviewAvg, setReviewAvg] = useState(null);

  const isLoggedIn = !!localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        setIsInWatchlist(false);

        const [movieRes, reviewsRes] = await Promise.all([
          getMovieDetail(id),
          getMovieReviews(id),
        ]);

        const movieData = movieRes?.data ?? null;
        setMovie(movieData);

        const reviewItems = Array.isArray(reviewsRes?.data)
          ? reviewsRes.data
          : reviewsRes?.data?.items ?? [];
        setReviews(reviewItems);
        setReviewAvg(reviewsRes?.data?.avg ?? null);

        // Check if movie is in user's watchlist
        if (isLoggedIn && movieData?.id) {
          try {
            const watchlistRes = await getUserWatchlist();
            const watchlistItems = Array.isArray(watchlistRes?.data)
              ? watchlistRes.data
              : watchlistRes?.data?.items ?? [];
            const movieInWatchlist = watchlistItems.some(
              (item) => Number(item.movieId ?? item.id) === Number(movieData.id)
            );
            setIsInWatchlist(movieInWatchlist);
          } catch (err) {
            console.error('Error fetching watchlist', err);
            setIsInWatchlist(false);
          }
        }
      } catch (err) {
        console.error('Error fetching movie details', err);
        setMovie(null);
        setReviews([]);
        setReviewAvg(null);
        setError('Không thể tải dữ liệu phim.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isLoggedIn]);

  const handleToggleWatchlist = async () => {
    if (!isLoggedIn) {
      alert('Vui lòng đăng nhập để thêm vào danh sách yêu thích!');
      navigate('/login');
      return;
    }

    const movieId = Number(id);
    if (!Number.isFinite(movieId) || movieId < 0) {
      alert('movieId không hợp lệ');
      return;
    }

    try {
      setIsLoadingWatchlist(true);
      const res = await toggleWatchlist(movieId);
      const isAdded = res?.data?.added ?? false;
      setIsInWatchlist(isAdded);
      const successMsg = isAdded ? 'Đã thêm vào danh sách yêu thích' : 'Đã xóa khỏi danh sách yêu thích';
      alert(successMsg);
    } catch (err) {
      console.error('Error toggling watchlist', err);
      const message = err?.response?.data?.message || 'Có lỗi xảy ra';
      alert(message);
    } finally {
      setIsLoadingWatchlist(false);
    }
  };

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

    if (!content.trim()) {
      alert('Vui lòng nhập nội dung đánh giá!');
      return;
    }

    const movieId = Number(id);

    if (!Number.isFinite(movieId) || movieId < 0) {
      alert('movieId không hợp lệ');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await submitReview(movieId, rating, content.trim());
      const createdReview = res?.data ?? res;
      setReviews((current) => [createdReview, ...current]);
      setRating(0);
      setHoverRating(0);
      setContent('');
    } catch (err) {
      const backendErrors = err?.response?.data?.error;
      const message = Array.isArray(backendErrors) && backendErrors.length > 0
        ? backendErrors.join('\n')
        : err?.response?.data?.message || err.message || 'Có lỗi xảy ra khi gửi đánh giá';

      console.error('Error submitting review', err);
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (value) => {
    if (!value) return 'Chưa cập nhật';
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString('vi-VN');
    }
    return value;
  };

  const getMediaUrl = (value, fallback) => {
    if (!value) return fallback;
    if (value.startsWith('http')) return value;
    return `https://image.tmdb.org/t/p/w500${value}`;
  };

  const formatCurrency = (value) => {
    if (typeof value !== 'number') return 'Chưa có dữ liệu';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatSentiment = (sentiment) => {
    const normalized = String(sentiment || '').toLowerCase();

    switch (normalized) {
      case 'positive':
        return {
          color: 'bg-green-500/20 text-green-400 border-green-500/30',
          icon: <ThumbsUp className="mr-1 h-4 w-4" />,
          label: 'Tích cực',
        };
      case 'negative':
        return {
          color: 'bg-red-500/20 text-red-400 border-red-500/30',
          icon: <ThumbsDown className="mr-1 h-4 w-4" />,
          label: 'Tiêu cực',
        };
      default:
        return {
          color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
          icon: <Minus className="mr-1 h-4 w-4" />,
          label: 'Trung lập',
        };
    }
  };

  const renderStars = (value) => {
    return Array.from({ length: 10 }, (_, index) => {
      const star = index + 1;
      return (
        <button
          key={star}
          type="button"
          className="transition-transform hover:scale-110 focus:outline-none"
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setRating(star)}
        >
          <Star
            className={`h-6 w-6 ${
              star <= value
                ? 'fill-current text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]'
                : 'text-gray-600'
            }`}
          />
        </button>
      );
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-cinema-black pb-16 font-sans text-white">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="animate-pulse text-2xl font-bold tracking-widest text-cinema-red">
            ĐANG TẢI...
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex min-h-screen flex-col bg-cinema-black pb-16 font-sans text-white">
        <Navbar />
        <div className="flex flex-1 items-center justify-center px-4 text-center text-xl text-white/80">
          {error || 'Không tìm thấy thông tin phim.'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cinema-black pb-24 font-sans text-white">
      <Navbar />

      <MovieHeader
        movie={movie}
        reviewAvg={reviewAvg}
        isInWatchlist={isInWatchlist}
        isLoadingWatchlist={isLoadingWatchlist}
        onToggleWatchlist={handleToggleWatchlist}
        getMediaUrl={getMediaUrl}
      />

      <div className="container mx-auto mt-16 px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left Column - Reviews */}
          <div className="space-y-8 lg:col-span-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="flex items-center text-3xl font-bold">
                <MessageSquare className="mr-3 h-6 w-6 text-cinema-red" />
                Đánh giá & Bình luận
              </h2>
              <span className="text-gray-400">{reviews.length} đánh giá</span>
            </div>

            <ReviewForm
              rating={rating}
              hoverRating={hoverRating}
              setHoverRating={setHoverRating}
              content={content}
              setContent={setContent}
              onSubmit={handleReviewSubmit}
              isSubmitting={isSubmitting}
              renderStars={renderStars}
            />

            <ReviewList
              reviews={reviews}
              formatDate={formatDate}
              formatSentiment={formatSentiment}
            />
          </div>

          {/* Right Column - Movie Info */}
          <MovieInfo
            movie={movie}
            formatDate={formatDate}
            formatCurrency={formatCurrency}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
