// Original implementation here: https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
import React from 'react';
import { usePagination, DOTS } from '../../hooks/usePagination';

type PaginationProps = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
};
const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <ul className="flex justify-center">
      {paginationRange.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li
              className="text-l my-auto mx-0.5 flex h-8 w-[32px] cursor-default items-center rounded-2xl py-0 px-3 text-center font-light text-black/[.87] hover:bg-transparent"
              key={index}
            >
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            className={`text-l my-auto mx-0.5 flex h-8 w-[32px] cursor-pointer items-center rounded-2xl border py-0 px-3 text-center font-light ${
              pageNumber === currentPage
                ? 'border-asphalt  bg-asphalt text-white'
                : 'border-darkGrey text-asphalt hover:bg-asphalt/[0.2]'
            }`}
            onClick={() => onPageChange(pageNumber as number)}
            key={index}
          >
            {pageNumber}
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
