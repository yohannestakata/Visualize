import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../services";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isPending, mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user-verify"]);
      localStorage.setItem("jwt", data.data.token);
      navigate("/");
    },
    onError: (error) =>
      toast({
        title: "Sign-up failed!",
        description: error.response.data.message,
        variant: "destructive",
      }),
  });

  return { data: data?.data, isPending, mutate };
}

export default useSignup;
