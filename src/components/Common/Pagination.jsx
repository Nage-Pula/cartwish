import React from 'react'
import './Pagination.css'

const Pagination = ({ totalPosts, postsPerPage, onClick, currentPage }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="pagination_wrapper">
      <ul className="pagination">
        <li>
          <button
            className="pagination_button pagination_nav"
            onClick={() => onClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹ Prev
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              className={parseInt(currentPage) === page ?
                'pagination_button active' : 'pagination_button'}
              onClick={() => onClick(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className="pagination_button pagination_nav"
            onClick={() => onClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next ›
          </button>
        </li>
      </ul>
      <p className="pagination_info">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  )
}

export default Pagination
