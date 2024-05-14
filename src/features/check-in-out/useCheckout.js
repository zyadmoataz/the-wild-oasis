import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

//update booking by getting its id and change in the object in this 2 fields and update the api with the new data
export function useCheckout() {
  const queryClient = useQueryClient();

  //if its checked in then convert status from uncofirmed to checked in and make is paid set from false to true by updating the api by getting its id and change in the object in this 2 fields
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    // TODO: call api
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    // onSuccess receives the data returned from the mutation function above and is called when the mutation is successful
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} is successfully checked out`);
      //invaldateQuery({active: true}) will refetch the query with the new data
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("There was an error while checking out. Please try again");
    },
  });

  return { checkout, isCheckingOut };
}
