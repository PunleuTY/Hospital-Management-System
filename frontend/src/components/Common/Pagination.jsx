import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  showItemsInfo = true,
  showPageNumbers = true,
  maxVisiblePages = 5,
  className = "",
  buttonClassName = "",
  activeButtonClassName = "",
  disabledButtonClassName = "",
}) => {
  // Calculate visible page numbers
  const getVisiblePages = () => {
    const pages = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Calculate items info
  const getItemsInfo = () => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    return { startItem, endItem };
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const visiblePages = getVisiblePages();
  const { startItem, endItem } = getItemsInfo();

  // Don't render if there's only one page or no items
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Items info */}
      {showItemsInfo && (
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{startItem}</span> to{" "}
          <span className="font-medium">{endItem}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500
            ${buttonClassName} 
            ${currentPage === 1 ? disabledButtonClassName : ""}
          `}
          aria-label="Previous page"
        >
          <FaChevronLeft className="text-[15px]" />
          Previous
        </button>

        {/* Page numbers */}
        {showPageNumbers && (
          <div className="flex items-center space-x-1">
            {/* First page and ellipsis */}
            {visiblePages[0] > 1 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className={`
                    inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50
                    ${buttonClassName}
                  `}
                >
                  1
                </button>
                {visiblePages[0] > 2 && (
                  <span className="px-2 py-2 text-sm text-gray-500">...</span>
                )}
              </>
            )}

            {/* Visible page numbers */}
            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`
                  inline-flex items-center px-3 py-2 text-sm font-medium rounded-md
                  ${
                    page === currentPage
                      ? `text-white bg-blue-600 border border-blue-600 hover:bg-blue-700 ${activeButtonClassName}`
                      : `text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 ${buttonClassName}`
                  }
                `}
              >
                {page}
              </button>
            ))}

            {/* Last page and ellipsis */}
            {visiblePages[visiblePages.length - 1] < totalPages && (
              <>
                {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                  <span className="px-2 py-2 text-sm text-gray-500">...</span>
                )}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`
                    inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50
                    ${buttonClassName}
                  `}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
        )}

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500
            ${buttonClassName}
            ${currentPage === totalPages ? disabledButtonClassName : ""}
          `}
          aria-label="Next page"
        >
          Next
          <FaChevronRight className="text-[15px]" />
        </button>
      </div>
    </div>
  );
};

// Simple pagination component without items info
export const SimplePagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = "",
}) => {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      showItemsInfo={false}
      className={className}
    />
  );
};

// Compact pagination component with minimal UI
export const CompactPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = "",
}) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>

      <span className="px-3 py-1 text-sm text-gray-700">
        {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
