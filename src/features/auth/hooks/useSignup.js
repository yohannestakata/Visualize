import { useMutation } from "react-query";
import { signup } from "../services/services";
import { useNavigate } from "react-router-dom";

function useSignup() {
  const navigate = useNavigate();

  const { data, isLoading, mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log(data);
      navigate("/");
    },
  });

  return { data: data?.data, isLoading, mutate };
}

export default useSignup;
