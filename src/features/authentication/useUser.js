import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  //get current user and store it into cache so it doezn't need to be redownloaded so we will use useQuery
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
