/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

//solving error
const FilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

// const FilterButton = styled.button`
//   background-color: var(--color-grey-0);
//   border: none;

//   ${(props) =>
//     props.active &&
//     css`
//       background-color: var(--color-brand-600);
//       color: var(--color-brand-50);
//     `}

//   border-radius: var(--border-radius-sm);
//   font-weight: 500;
//   font-size: 1.4rem;
//   /* To give the same height as select */
//   padding: 0.44rem 0.8rem;
//   transition: all 0.3s;

//   &:hover:not(:disabled) {
//     background-color: var(--color-brand-600);
//     color: var(--color-brand-50);
//   }
// `;

//we will store the value in which the table should be filtered in the URL again
//because the URL is gonna be easily sharable and bookmarkable.
//Filter component can be anywhere in the component tree and doesn't have to be close to the cabin table
//we will store the state in the URL not a state then it can be anywhere as if we were using state it have to be a child of cabin table.
// function Filter() {
//   //useSearchParams hook is similar to useState hook as it also gives us the state and a way to update it
//   const [searchParams, setSearchParams] = useSearchParams();
//   function handleClick(value) {
//     //this part is updating the url
//     //for example if we clicked on no discount button we will got this "http://localhost:5173/cabins?discount=no-discount"
//     searchParams.set("discount", value);
//     setSearchParams(searchParams);
//   }

//   return (
//     <StyledFilter>
//       {/* We need to update the url state when we click on any button of these */}
//       <FilterButton onClick={() => handleClick("all")}>All</FilterButton>
//       <FilterButton onClick={() => handleClick("no-discount")}>
//         No Discount
//       </FilterButton>
//       <FilterButton onClick={() => handleClick("with-discount")}>
//         With Discount
//       </FilterButton>
//     </StyledFilter>
//   );
// }

//now we will make it reusable
//use them as props as filterField is "disocunt" and options will be an array of ["all","no-discount"]
function Filter({ filterField, options }) {
  //useSearchParams hook is similar to useState hook as it also gives us the state and a way to update it
  const [searchParams, setSearchParams] = useSearchParams();

  //get vurrent value to make the button always active when we select it and we done this in styled component
  //then pass it as an active prop and check if the current value = to that filter value
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    //this part is updating the url
    //for example if we clicked on no discount button we will got this "http://localhost:5173/cabins?discount=no-discount"
    searchParams.set(filterField, value);

    //reset page to page 1 when we use filter as if we are on page 3 we will be on page 1 when we use filter
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
