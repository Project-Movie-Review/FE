import { useState } from 'react';

const buildPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, 2, totalPages - 1, totalPages]);
  const start = Math.max(3, currentPage - 1);
  const end = Math.min(totalPages - 2, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    pages.add(page);
  }

  const sortedPages = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const items = [];

  sortedPages.forEach((page, index) => {
    if (index > 0 && page - sortedPages[index - 1] > 1) {
      items.push('ellipsis');
    }
    items.push(page);
  });

  return items;
};

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  const [inputPage, setInputPage] = useState('');

  if (totalPages <= 1) return null;

  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const paginationItems = buildPaginationItems(safeCurrentPage, totalPages);

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const pageNum = Number(inputPage);
      if (pageNum >= 1 && pageNum <= totalPages) {
        onPageChange(pageNum);
        setInputPage('');
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-5">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => onPageChange(safeCurrentPage - 1)}
          disabled={safeCurrentPage === 1}
          className="rounded-lg bg-cinema-zinc px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Trang trước
        </button>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {paginationItems.map((item, index) =>
            item === 'ellipsis' ? (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                className={`min-w-10 rounded-lg px-4 py-2 text-sm font-bold transition ${
                  item === safeCurrentPage
                    ? 'bg-cinema-red text-white shadow-[0_0_18px_rgba(229,9,20,0.35)]'
                    : 'bg-cinema-zinc text-white hover:bg-zinc-700'
                }`}
                aria-current={item === safeCurrentPage ? 'page' : undefined}
              >
                {item}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(safeCurrentPage + 1)}
          disabled={safeCurrentPage === totalPages}
          className="rounded-lg bg-cinema-zinc px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Trang sau
        </button>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <label htmlFor="page-input" className="text-sm font-medium text-gray-300">
          Đi tới trang
        </label>
        <input
          id="page-input"
          type="number"
          min="1"
          max={totalPages}
          value={inputPage}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={`${safeCurrentPage}`}
          className="w-20 rounded-lg border border-white/10 bg-cinema-black px-3 py-2 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-cinema-red"
        />
        <span className="text-sm text-gray-400">/ {totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
