import { FC, useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { PaginationProps } from "./pagination.config";

const PaginationComponent: FC<PaginationProps> = ({
  totalPages,
  page,
  setPage,
  changeToNextPage,
  changeToPrevPage,
}) => {
  const [currentPage, setCurrentPage] = useState(page);

  const handleChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setPage(page);
      setCurrentPage(page);
    }
  };

  const getPaginationRange = () => {
    const range = [];
    const start = Math.max(1, currentPage - 5);
    const end = Math.min(totalPages, currentPage + 4);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <Pagination>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          previous
          onClick={() => {
            handleChange(currentPage - 1);
            changeToPrevPage();
          }}
        />
      </PaginationItem>

      {currentPage > 6 && (
        <PaginationItem>
          <PaginationLink onClick={() => handleChange(1)}>1</PaginationLink>
        </PaginationItem>
      )}

      {currentPage > 7 && <PaginationItem disabled>...</PaginationItem>}

      {getPaginationRange().map((pageNum) => (
        <PaginationItem
          active={currentPage === pageNum}
          key={pageNum}
          onClick={() => handleChange(pageNum)}
        >
          <PaginationLink>{pageNum}</PaginationLink>
        </PaginationItem>
      ))}

      {currentPage < totalPages - 6 && (
        <PaginationItem disabled>...</PaginationItem>
      )}

      {currentPage < totalPages - 5 && (
        <PaginationItem>
          <PaginationLink onClick={() => handleChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )}

      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink
          next
          onClick={() => {
            handleChange(currentPage + 1);
            changeToNextPage();
          }}
        />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationComponent;
