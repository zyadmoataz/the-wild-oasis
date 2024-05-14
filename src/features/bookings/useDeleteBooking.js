import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  //mutate is a callback function
  //onSuccess is to be called when the mutation is successful, we want to refetch the data
  //this will be done by revalidating the cache
  const { isLoading: isDeletingBooking, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingAPI,
    onSuccess: () => {
      toast.success("Booking deleted");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isDeletingBooking, deleteBooking };
}
