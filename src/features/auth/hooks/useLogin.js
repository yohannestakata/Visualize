import { useMutation } from "@tanstack/react-query";
import { login } from "../services";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    },
  });

  return { mutate, isLoading };
}

export default useLogin;
