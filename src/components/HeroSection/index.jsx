import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import HeroActions from "./HeroActions";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroNavigation from "./HeroNavigation";
import HeroIndicators from "./HeroIndicators";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop";

const HeroSection = ({ movies = [], onClick }) => {
  const [current, setCurrent] = useState(0);
  const hasMovies = movies.length > 0;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % movies.length);
  }, [movies.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + movies.length) % movies.length);
  }, [movies.length]);

  if (!hasMovies) return null;
  const currentMovie = movies[current];
  const imageUrl = currentMovie?.backdrop || FALLBACK_IMAGE;

  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden bg-black group">
      <AnimatePresence mode="wait">
        <div
          key={currentMovie.id}
          className="absolute inset-0"
        >
          <HeroBackground
            backdrop={imageUrl}
            title={currentMovie.title}
          />


          <div className="relative z-10 container mx-auto h-full px-6 md:px-20 flex flex-col justify-between">
            <div className="max-w-2xl">
              <HeroContent movie={currentMovie} />
            </div>
            <div>
              <HeroActions onClick={() => onClick(currentMovie.id)}/>
            </div>
          </div>
        </div>
      </AnimatePresence>
      <HeroNavigation
        onPrev={prevSlide}
        onNext={nextSlide}
      />
      <HeroIndicators
        movies={movies}
        current={current}
        setCurrent={setCurrent}
      />
    </section>
  );
};

export default HeroSection;