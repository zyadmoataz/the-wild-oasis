import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  //get the id from url params and pass it to the api
  const { bookingId } = useParams();

  //By default react query will try to fetch data 3 times if there is an error
  //if there is no point in retrying then make it false
  //retry to false to prevent infinite loop of making api calls

  const {
    isLoading,
    error,
    data: booking,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, error, booking };
}
