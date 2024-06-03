import { useQuery } from "@tanstack/react-query";
import { verifyUser } from "../services";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

function useVerifyUser() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data, isLoading, error } = useQuery({
    queryFn: verifyUser,
    queryKey: ["user-verify"],
  });

  if (error) {
    toast({
      title: "Error",
      description: "Session expired. Please login again.",
      variant: "destructive",
    });
    navigate("/auth/login");
  }

  return { data: data?.data, isLoading };
}

export default useVerifyUser;
