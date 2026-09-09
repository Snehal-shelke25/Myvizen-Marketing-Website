import React from 'react';

export default function Pagination({ page, totalPages, total, noun = 'items', onChange }) {
  if (totalPages <= 1) {
    return (
      <div className="admin-pagination">
        <span>{total} {noun}</span>
      </div>
    );
  }
  return (
    <div className="admin-pagination">
      <button type="button" className="btn btn-outline"
              disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Previous
      </button>
      <span>Page {page} of {totalPages} &middot; {total} {noun}</span>
      <button type="button" className="btn btn-outline"
              disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </div>
  );
}
