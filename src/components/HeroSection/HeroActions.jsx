import { Play, Plus } from "lucide-react";

const HeroActions = () => (
  <div className="flex items-center space-x-4 pt-4">
    <button className="flex items-center bg-white text-black px-8 py-3 rounded-lg font-bold">
      <Play className="w-5 h-5 mr-2 fill-current" />
      Phát ngay
    </button>

    <button className="flex items-center bg-[#27272a]/70 text-white px-8 py-3 rounded-lg font-bold">
      <Plus className="w-5 h-5 mr-2" />
      Thêm Danh Sách
    </button>
  </div>
);

export default HeroActions;