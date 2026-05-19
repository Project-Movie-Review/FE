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
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-gray-300 bg-clip-text text-transparent leading-tight tracking-tight drop-shadow-sm">
            {movie.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span className="flex items-center text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20 shrink-0">
                <Star className="w-4 h-4 mr-1 fill-current" />
                {movie.rating?.toFixed(1)}
            </span>

            <span className="text-gray-600">•</span>

            <span className="font-medium">{movie.releaseDate}</span>
        </div>

        <p className="text-base md:text-lg text-gray-400 leading-relaxed line-clamp-3 font-normal max-w-xl">
            {movie.overview || "Đang cập nhật mô tả..."}
        </p>
    </motion.div>
);

export default HeroContent;