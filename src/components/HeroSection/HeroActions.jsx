import { Info } from "lucide-react";

const HeroActions = ({ onClick }) => {
  return (
    <div className="flex items-center space-x-4 pt-4">
      <button
        className="flex items-center bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-400 transition-colors cursor-pointer"
        onClick={onClick}
      >
        <Info className="w-5 h-5 mr-2 " />
        Tìm hiểu thêm
      </button>
    </div>
  );
};

export default HeroActions;