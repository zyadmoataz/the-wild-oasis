import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  //1) Filter
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" }; //then we dont have to filter

  //the querKey is like dependency array of use query
  //make queryKey equal to filter also to make it depend on it this will make data change when we click on any button without reloading page
  //the filter data also will be stored in the chache "["bookings",{"field":"status","value":"checked-in"}]"

  //2) Sort
  //default value is "startDate-desc"
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //3) pagination
  //current page which we will get from the url will be 1 if not exist and will be a number else
  const page = !searchParams.get("page") ? 1 : +searchParams.get("page");

  //Query
  const {
    isLoading,
    error,
    data: { data: bookings, count } = {},
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //Pre-Fetching
  //First we need query client and then use prefetch query hook
  //it works as use query hook but it will be prefetched
  //use this condition as we dont have to load the last page as it doesnt exist as in page number 9 there is no data to show for page number 10
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}
