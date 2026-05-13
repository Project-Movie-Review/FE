const ReviewForm = ({
  rating,
  hoverRating,
  content,
  setContent,
  onSubmit,
  isSubmitting,
  renderStars,
}) => {
  return (
    <div className="rounded-2xl border border-white/5 bg-cinema-zinc/40 p-6 shadow-xl">
      <h3 className="mb-4 text-lg font-semibold">Gửi đánh giá của bạn</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {renderStars(hoverRating || rating)}
          <span className="ml-2 w-14 text-sm font-medium text-gray-400">
            {rating > 0 ? `${rating}/10` : ''}
          </span>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Bạn nghĩ gì về bộ phim này?"
          className="min-h-[120px] w-full resize-y rounded-xl border border-white/10 bg-black/50 p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-cinema-red focus:ring-1 focus:ring-cinema-red"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center rounded-xl bg-cinema-red px-8 py-3 font-bold text-white transition-all hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
