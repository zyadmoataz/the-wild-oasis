/* eslint-disable no-unused-vars */
// import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import Spinner from "./../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Empty from "../../ui/Empty";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { isLoading, error, cabins } = useCabins();

  //Filtering and sorting is done in the client side
  //1)Filter
  //here we dont need to update the search params only we need that value to sort the table
  const [searchParams] = useSearchParams();

  //we will got null when we first sgo to cabin pages and in this situation we need all cabins
  //so that we will make short circuiting to make it all if its = null
  const filterValue = searchParams.get("discount") || "all";
  // console.log(filterValue);

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName='Cabins' />;

  //then use this filteredCabins instead of the data
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  //2- Sort
  //destructure it into filed and direction
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");

  //to detect the change in direction
  const modfier = direction === "asc" ? 1 : -1;

  //it will be based on the previous step as we take all the cabins then filter them
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modfier
  );

  console.log(modfier, direction, field, sortedCabins);

  return (
    // We want to pass the column definition to the table
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {/* Render Prop tells it what to do with this data as its an array but it tells it what to do with it */}
        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
        {/* {cabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))} */}
      </Table>
    </Menus>
  );
}

export default CabinTable;
