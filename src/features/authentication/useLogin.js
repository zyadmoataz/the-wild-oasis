import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  //to make the login quicker we can use the useQueryClient hook to get the latest data from the cache
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
      toast.success("Login successful");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Provided Email or Password are incorrect");
    },
  });

  return { login, isLoading };
}
