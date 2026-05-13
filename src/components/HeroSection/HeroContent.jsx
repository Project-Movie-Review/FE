import { Star } from "lucide-react";
import { motion } from "framer-motion";

const HeroContent = ({ movie }) => (
    <motion.div
      key={movie.id}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-5"
    >
        <h1 className="text-5xl font-bold text-white leading-tight">
            {movie.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-300">
            <span className="flex items-center text-yellow-400 font-semibold">
                <Star className="w-5 h-5 mr-1 fill-current" />
                {movie.rating?.toFixed(1)}
            </span>

            <span>•</span>

            <span>{movie.releaseDate}</span>
        </div>

        <p className="text-base md:text-lg text-gray-300 leading-relaxed line-clamp-3">
            {movie.overview || "Đang cập nhật mô tả..."}
        </p>
    </motion.div>
);

export default HeroContent;