import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  //numDays will be set to 7 if not set in url or will be converted to number
  const numDays = !searchParams.get("last") ? 7 : +searchParams.get("last");

  //subDays will subtract the number of days from the current date
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    //queryKey will be used to fetch data from cache and it has to be unique
    queryKey: ["stays", `last-${numDays}`],
  });

  //filter stays with status checked-in or checked-out to get only confirmed stays
  const confirmedStays = stays?.filter(
    (stay) => stay?.status === "checked-in" || stay?.status === "checked-out"
  );

  return { isLoading, stays, confirmedStays, numDays };
}
