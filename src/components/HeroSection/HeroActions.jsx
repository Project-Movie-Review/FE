import { Info } from "lucide-react";

const HeroActions = ({ onClick }) => {
  return (
    <div className="mt-auto flex items-center pt-4">
      <button
        className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform cursor-pointer"
        onClick={onClick}
      >
        <Info className="w-5 h-5" />
        Tìm hiểu thêm
      </button>
    </div>
  );
};

export default HeroActions;