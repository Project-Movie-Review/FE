import { Info } from "lucide-react";

const HeroActions = ({ onClick }) => {
  return (
    <div className="mt-auto flex items-center pt-2">
      <button
        className="flex items-center gap-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-[0_4px_20px_rgba(229,9,20,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_25px_rgba(229,9,20,0.5)] active:scale-97 cursor-pointer"
        onClick={onClick}
      >
        <Info className="w-5 h-5 fill-white/10" />
        Tìm hiểu thêm
      </button>
    </div>
  );
};

export default HeroActions;