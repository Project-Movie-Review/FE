import HeroActions from "./HeroActions";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";

const HeroSection = ({ movie, onClick }) => {
  if (!movie) return null;

  

  return (
    <div className="relative w-full h-[75vh] min-h-[500px]">
      <HeroBackground backdrop={movie.backdrop} title={movie.title} />

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6">
          <HeroContent movie={movie} />
          <HeroActions onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;