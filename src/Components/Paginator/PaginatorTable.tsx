import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface PaginatorTableProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export const PaginatorTable: React.FC<PaginatorTableProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        className={`px-3 py-1 mx-1 border ${
          currentPage === 1 ? "cursor-not-allowed" : ""
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IconChevronLeft />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            className={`px-3 py-1 mx-1 border ${
              currentPage === pageNumber ? "bg-gray-200" : ""
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      )}
      <button
        className={`px-3 py-1 mx-1 border ${
          currentPage === totalPages ? "cursor-not-allowed" : ""
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IconChevronRight />
      </button>
    </div>
  );
};
