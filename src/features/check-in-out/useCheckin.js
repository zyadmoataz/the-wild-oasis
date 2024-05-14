import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

//update booking by getting its id and change in the object in this 2 fields and update the api with the new data
export function useCheckin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  //if its checked in then convert status from uncofirmed to checked in and make is paid set from false to true by updating the api by getting its id and change in the object in this 2 fields
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    // TODO: call api
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    // onSuccess receives the data returned from the mutation function above and is called when the mutation is successful
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} is successfully checked in`);
      //invaldateQuery({active: true}) will refetch the query with the new data
      queryClient.invalidateQueries({ active: true });
      //navigate to homepage which is the dashboard
      navigate("/");
    },
    onError: () => {
      toast.error("There was an error while checking in. Please try again");
    },
  });

  return { checkin, isCheckingIn };
}
