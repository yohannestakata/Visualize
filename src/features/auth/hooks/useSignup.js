import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../services";
import { useNavigate } from "react-router-dom";

function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["user-verify"]);
      navigate("/");
    },
  });

  return { data: data?.data, isLoading, mutate };
}

export default useSignup;
