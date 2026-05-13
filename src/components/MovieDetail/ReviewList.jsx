import ReviewCard from './ReviewCard';

const ReviewList = ({ reviews, formatDate, formatSentiment }) => {
  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-white/5 bg-white/5 px-4 py-8 text-center text-gray-400">
        Chưa có bình luận nào. Hãy là người đầu tiên đánh giá!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <ReviewCard
          key={review.id ?? `${review.author || 'Anonymous'}-${review.createdAt}-${index}`}
          review={review}
          formatDate={formatDate}
          formatSentiment={formatSentiment}
        />
      ))}
    </div>
  );
};

export default ReviewList;
