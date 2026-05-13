const MovieInfo = ({ movie, formatDate, formatCurrency }) => {
  const spokenLanguages = Array.isArray(movie.spoken_languages)
    ? movie.spoken_languages.map((item) => item.english_name || item.name).filter(Boolean)
    : [];

  return (
    <div className="space-y-8">
      {/* Movie Details Sidebar */}
      <div className="rounded-2xl border border-white/5 bg-cinema-zinc/30 p-6">
        <h3 className="mb-4 border-b border-white/10 pb-2 text-xl font-bold">Thông tin phim</h3>
        <ul className="space-y-4 text-sm">
          <li className="flex justify-between gap-4">
            <span className="text-gray-400">Mã phim</span>
            <span className="font-medium text-white">{movie.id}</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-gray-400">Ngày phát hành</span>
            <span className="font-medium text-white">{formatDate(movie.release_date)}</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-gray-400">Ngôn ngữ gốc</span>
            <span className="font-medium text-white">{movie.original_language || 'Chưa rõ'}</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-gray-400">Kinh phí</span>
            <span className="font-medium text-white">{formatCurrency(movie.budget)}</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-gray-400">Doanh thu</span>
            <span className="font-medium text-white">{formatCurrency(movie.revenue)}</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-gray-400">Quốc gia</span>
            <span className="font-medium text-white">
              {movie.production_countries?.map((item) => item.name).filter(Boolean).join(', ') || 'Chưa rõ'}
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-gray-400">Ngôn ngữ</span>
            <span className="font-medium text-white">{spokenLanguages.join(', ') || 'Chưa rõ'}</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-gray-400">IMDb</span>
            <span className="font-medium text-white">{movie.imdb_id || 'Chưa rõ'}</span>
          </li>
        </ul>
      </div>

      {/* Notable Actors */}
      {movie.noteableActors?.length ? (
        <div className="rounded-2xl border border-white/5 bg-cinema-zinc/30 p-6">
          <h3 className="mb-4 border-b border-white/10 pb-2 text-xl font-bold">Diễn viên nổi bật</h3>
          <div className="space-y-4">
            {movie.noteableActors.slice(0, 5).map((actor) => (
              <div key={actor.id} className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                {actor.profile ? (
                  <img src={actor.profile} alt={actor.name} className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sm font-bold">
                    {actor.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate font-semibold">{actor.name}</p>
                  <p className="truncate text-xs text-gray-400">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MovieInfo;
