import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries(["user-verify"]);
      navigate("/");
    },
  });

  return { mutate, isLoading };
}

export default useLogin;
