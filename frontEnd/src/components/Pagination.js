import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 0}
        className="px-4 py-2 bg-gray-300 rounded-l-md"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-gray-200">
        Page {currentPage + 1} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}
        className="px-4 py-2 bg-gray-300 rounded-r-md"
      >
      Next
      </button>
    </div>
  );
};

export default Pagination;
