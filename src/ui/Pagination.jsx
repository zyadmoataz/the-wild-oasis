/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  //count Props is the total number of results
  //going to next or previous page depend on current page which we will got from the url
  const [searchParams, setSearchParams] = useSearchParams();

  //current page which we will get from the url will be 1 if not exist and will be a number else
  const currentPage = !searchParams.get("page") ? 1 : +searchParams.get("page");

  //total number of pages will be total number of results divided by page size
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    //if current page is equal to total number of pages then we will not go to next page else we will go to next page
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    //we will update the url with the next page
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    //if current page is 1 then we will not go to previous page else we will go to previous page
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    //we will update the url with the previous page
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>

        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <HiChevronRight />
          <span>Next</span>
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;