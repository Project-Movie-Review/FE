import { ChevronUp, ChevronDown } from 'lucide-react';

const ReviewFilter = ({ sortBy, sortOrder, onSortByChange, onSortOrderChange }) => {
  const sortOptions = [
    { value: null, label: 'Mặc định' },
    { value: 'rating', label: 'Đánh giá (sao)' },
    { value: 'createdAt', label: 'Mới nhất' },
    { value: 'usefulCount', label: 'Hữu ích nhất' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
      {/* Sort By Dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-300">Sắp xếp theo:</label>
        <select
          value={sortBy || ''}
          onChange={(e) => onSortByChange(e.target.value || null)}
          className="rounded-lg border border-white/10 bg-cinema-zinc px-3 py-2 text-white transition-colors focus:border-cinema-red focus:outline-none hover:border-white/20"
          style={{
            colorScheme: 'dark',
          }}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value || ''} style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Order Toggle */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-300">Thứ tự:</label>
        <div className="flex gap-1 rounded-lg border border-white/10 bg-cinema-zinc p-1">
          <button
            onClick={() => onSortOrderChange('asc')}
            className={`flex items-center gap-1 rounded px-3 py-2 transition-colors ${
              sortOrder === 'asc'
                ? 'bg-cinema-red text-white'
                : 'text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
            title="Tăng dần"
          >
            <ChevronUp className="h-4 w-4" />
            <span className="text-xs font-medium">Tăng</span>
          </button>
          <button
            onClick={() => onSortOrderChange('desc')}
            className={`flex items-center gap-1 rounded px-3 py-2 transition-colors ${
              sortOrder === 'desc'
                ? 'bg-cinema-red text-white'
                : 'text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
            title="Giảm dần"
          >
            <ChevronDown className="h-4 w-4" />
            <span className="text-xs font-medium">Giảm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewFilter;
