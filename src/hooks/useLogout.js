import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function useLogout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("jwt");
    navigate("/");
    toast({
      title: "Logged out!",
      description: "You've been logged out from your device.",
    });
    queryClient.clear();
  };
}
