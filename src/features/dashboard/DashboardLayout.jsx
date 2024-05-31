import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "./../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "./../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;

  & > * {
    flex: 1 1 calc(25% - 2.4rem); /* Four columns */

    @media (max-width: 1024px) {
      flex: 1 1 calc(50% - 2.4rem); /* Two columns */
    }

    @media (max-width: 768px) {
      flex: 1 1 100%; /* Single column */
    }
  }

  & > *:last-child {
    flex: 1 1 100%;
  }
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { isLoading: isLoading2, confirmedStays, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
