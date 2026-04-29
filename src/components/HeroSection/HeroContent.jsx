import { Star } from "lucide-react";

const HeroContent = ({ movie }) => (
    <>
        <h1 className="text-5xl md:text-7xl font-bold text-white">
            {movie.title}
        </h1>

        <div className="flex items-center space-x-4 text-gray-300">
            <span className="flex items-center text-yellow-500">
                <Star className="w-5 h-5 mr-1 fill-current" />
                {movie.vote_average?.toFixed(1)} Điểm
            </span>
            <span>|</span>
            <span>{movie.release_date?.substring(0, 4)}</span>
        </div>

        <p className="text-gray-300 line-clamp-3">
            {movie.overview || 'Đang cập nhật mô tả...'}
        </p>
    </>
);

export default HeroContent;