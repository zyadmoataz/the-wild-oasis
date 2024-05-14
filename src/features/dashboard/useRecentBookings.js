import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  //numDays will be set to 7 if not set in url or will be converted to number
  const numDays = !searchParams.get("last") ? 7 : +searchParams.get("last");

  //subDays will subtract the number of days from the current date
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    //queryKey will be used to fetch data from cache and it has to be unique
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}
