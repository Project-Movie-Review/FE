import { motion } from "framer-motion";

const HeroBackground = ({ backdrop, title }) => {
  return (
    <motion.div
      key={backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0"
    >
      <img
        src={backdrop}
        alt={title}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    </motion.div>
  );
};

export default HeroBackground;