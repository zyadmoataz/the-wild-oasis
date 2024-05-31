import styled from "styled-components";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "./../../ui/TableOperations";

const OperationsContainer = styled(TableOperations)`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

function CabinTableOperations() {
  return (
    <OperationsContainer>
      {/* <TableOperations> */}
      <Filter
        filterField='discount'
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by Name (A-Z)" },
          { value: "name-desc", label: "Sort by Name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by Price (Low First)" },
          { value: "regularPrice-desc", label: "Sort by Price (High First)" },
          { value: "maxCapacity-asc", label: "Sort by Capacity (Low First)" },
          {
            value: "maxCapacity-desc",
            label: "Sort by Capacity (High First)",
          },
        ]}
      />
      {/* </TableOperations> */}
    </OperationsContainer>
  );
}

export default CabinTableOperations;
