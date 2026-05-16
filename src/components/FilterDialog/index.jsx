import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const FilterDialog = ({ isOpen, onClose, onFilter }) => {
    const [minRating, setMinRating] = useState('');
    const [maxRating, setMaxRating] = useState('');
    const [minReleaseYear, setMinReleaseYear] = useState('');
    const [maxReleaseYear, setMaxReleaseYear] = useState('');
    const [sortBy, setSortBy] = useState('release_date');
    const [sortOrder, setSortOrder] = useState('desc');

    const handleFilter = (e) => {
        e.preventDefault();
        // Build options matching backend DTO: minReleaseDate/maxReleaseDate and sortBy values
        const params = {};
        if (minRating !== '') params.minRating = Number(minRating);
        if (maxRating !== '') params.maxRating = Number(maxRating);
        if (minReleaseYear !== '') params.minReleaseDate = `${minReleaseYear}-01-01`;
        if (maxReleaseYear !== '') params.maxReleaseDate = `${maxReleaseYear}-12-31`;
        if (sortBy) params.sortBy = sortBy; // values already mapped in select
        if (sortOrder) params.sortOrder = sortOrder;

        console.log('FilterDialog: submit', params);
        onFilter(params);
    };

    if (!isOpen) return null;

    const modal = (
        <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-zinc-900 p-8 rounded-lg shadow-lg w-full max-w-md relative pointer-events-auto" onClick={(e) => e.stopPropagation()} tabIndex={-1}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-zinc-800 rounded-full p-1">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6">Lọc phim</h2>
                <form onSubmit={handleFilter}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Rating tối thiểu</label>
                            <input
                                type="number"
                                value={minRating}
                                onChange={(e) => setMinRating(e.target.value)}
                                className="w-full bg-zinc-800 text-white p-2 rounded border border-white/10 focus:ring-cinema-red focus:border-cinema-red"
                                min="0"
                                max="10"
                                step="0.1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Rating tối đa</label>
                            <input
                                type="number"
                                value={maxRating}
                                onChange={(e) => setMaxRating(e.target.value)}
                                className="w-full bg-zinc-800 text-white p-2 rounded border border-white/10 focus:ring-cinema-red focus:border-cinema-red"
                                min="0"
                                max="10"
                                step="0.1"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Năm phát hành tối thiểu</label>
                            <input
                                type="number"
                                value={minReleaseYear}
                                onChange={(e) => setMinReleaseYear(e.target.value)}
                                className="w-full bg-zinc-800 text-white p-2 rounded border border-white/10 focus:ring-cinema-red focus:border-cinema-red"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Năm phát hành tối đa</label>
                            <input
                                type="number"
                                value={maxReleaseYear}
                                onChange={(e) => setMaxReleaseYear(e.target.value)}
                                className="w-full bg-zinc-800 text-white p-2 rounded border border-white/10 focus:ring-cinema-red focus:border-cinema-red"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Sắp xếp theo</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full bg-zinc-800 text-white p-2 rounded border border-white/10 focus:ring-cinema-red focus:border-cinema-red"
                        >
                            <option value="release_date" className="bg-zinc-800 text-white">Ngày phát hành</option>
                            <option value="vote_average" className="bg-zinc-800 text-white">Rating</option>
                            <option value="popularity" className="bg-zinc-800 text-white">Tên phim</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Thứ tự</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="w-full bg-zinc-800 text-white p-2 rounded border border-white/10 focus:ring-cinema-red focus:border-cinema-red"
                        >
                            <option value="desc" className="bg-zinc-800 text-white">Giảm dần</option>
                            <option value="asc" className="bg-zinc-800 text-white">Tăng dần</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-cinema-red text-white py-2.5 rounded-full font-bold hover:bg-cinema-red-dark transition-colors"
                    >
                        Tìm kiếm
                    </button>
                </form>
            </div>
        </div>
    );

    return createPortal(modal, document.body);
};

export default FilterDialog;
