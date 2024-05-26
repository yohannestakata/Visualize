import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isLoading, data, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries(["user-verify"]);
      navigate("/");
    },
    onError: (error) =>
      toast({
        title: "Login failed!",
        description: error.response.data.message,
        variant: "destructive",
      }),
  });

  return { mutate, isLoading };
}

export default useLogin;
