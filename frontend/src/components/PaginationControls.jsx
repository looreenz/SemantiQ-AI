import React from 'react';
import { Button } from 'react-bootstrap';

const PaginationControls = ({ page, totalPages, setPage }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="d-flex justify-content-center align-items-center my-4 gap-3">
      <Button
        className="bg-purple border-purple fw-bold"
        onClick={handlePrev}
        disabled={page <= 1}
      >
        <i className="bi bi-arrow-left" aria-hidden="true"></i>
      </Button>
      <span>
        Página {page} de {totalPages}
      </span>
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
