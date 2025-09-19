import React from "react";

const getPageNumbers = ({ currentPage, totalPages, pageNeighbours }) => {
  const totalNumbers = pageNeighbours * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
    let pages = [1];

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
};

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers({
    currentPage,
    totalPages,
    pageNeighbours: 1,
  });

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <nav className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between text-sm font-medium">
      <div className="text-gray-600">
        SHOWED {startItem} - {endItem} OF {totalItems} PRODUCTS
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md transition-colors disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 bg-gray-100 hover:bg-yellow-500 hover:text-white"
        >
          &lt;
        </button>

        {pageNumbers.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-md transition-colors ${
                currentPage === page
                  ? "bg-yellow-500 text-white cursor-default"
                  : "bg-gray-100 hover:bg-yellow-500 hover:text-white"
              }`}
            >
              {String(page).padStart(2, "0")}
            </button>
          ) : (
            <span key={index} className="px-3 py-1 text-gray-400">
              {page}
            </span>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md transition-colors disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 bg-gray-100 hover:bg-yellow-500 hover:text-white"
        >
          &gt;
        </button>
      </div>
    </nav>
  );
}
