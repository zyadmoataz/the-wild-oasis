import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  //remove all quires in the cache
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      //remove all quires
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}
