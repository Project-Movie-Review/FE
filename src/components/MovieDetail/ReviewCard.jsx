import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ReviewCard = ({ review, formatDate, formatSentiment }) => {
  const sentiment = formatSentiment(review.sentiment);
  const reviewAuthor = review.author || review.username || 'Anonymous';
  const reviewContent = review.content || '';
  const reviewDate = review.createdAt || review.created_at;
  const reviewAvatar = review.avatar || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/5 bg-white/5 p-6 transition-colors hover:border-white/10"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {reviewAvatar ? (
            <img
              src={reviewAvatar}
              alt={reviewAuthor}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-cinema-red/30"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-cinema-red to-orange-500 text-lg font-bold shadow-lg">
              {reviewAuthor.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-semibold">{reviewAuthor}</p>
            <p className="text-xs text-gray-400">{formatDate(reviewDate)}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="flex items-center rounded-md bg-yellow-500/10 px-2 py-1 text-sm font-bold text-yellow-500">
            <Star className="mr-1 h-3 w-3 fill-current" />
            {review.rating}/10
          </span>
          <div className={`flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${sentiment.color}`}>
            {sentiment.icon}
            {sentiment.label}
          </div>
        </div>
      </div>

      <p className="rounded-xl border border-white/5 bg-black/20 p-4 leading-relaxed text-gray-300 italic">
        {reviewContent || 'Không có nội dung bình luận.'}
      </p>
    </motion.div>
  );
};

export default ReviewCard;
