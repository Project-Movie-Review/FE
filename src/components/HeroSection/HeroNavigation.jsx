import { ChevronLeft, ChevronRight } from "lucide-react";

const navigationButtonClass = `
  hidden md:flex
  absolute top-1/2
  -translate-y-1/2
  z-20
  p-3
  rounded-full
  bg-black/30
  text-white
  backdrop-blur-md
  transition-all duration-300
  opacity-0
  group-hover:opacity-100
  hover:bg-black/60
  hover:scale-110
`;

const HeroNavigation = ({ onPrev, onNext }) => {
  return (
    <>
      <button
        onClick={onPrev}
        className={`${navigationButtonClass} left-4`}
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={onNext}
        className={`${navigationButtonClass} right-4`}
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </>
  );
};

export default HeroNavigation;