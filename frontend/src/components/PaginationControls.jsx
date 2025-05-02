import React from "react";
import { Button } from "react-bootstrap";

// PaginationControls displays previous/next buttons and current page status
const PaginationControls = ({ page, totalPages, setPage }) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  // Go to previous page, but not less than 1
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));

  // Go to next page, but not beyond totalPages
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="d-flex justify-content-center align-items-center my-4 gap-3">
      {/* Previous page button */}
      <Button
        className="bg-purple border-purple fw-bold"
        onClick={handlePrev}
        disabled={page <= 1}
      >
        <i className="bi bi-arrow-left" aria-hidden="true"></i>
      </Button>

      {/* Page indicator */}
      <span>
        Página {page} de {totalPages}
      </span>

      {/* Next page button */}
      <Button
        className="bg-purple border-purple fw-bold"
        onClick={handleNext}
        disabled={page >= totalPages}
      >
        <i className="bi bi-arrow-right" aria-hidden="true"></i>
      </Button>
    </div>
  );
};

export default PaginationControls;
