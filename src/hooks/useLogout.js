import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function useLogout() {
  const navigate = useNavigate();
  const { toast } = useToast();

  return () => {
    localStorage.removeItem("jwt");
    navigate("/");
    toast({
      title: "Logged out!",
      description: "You've been logged out from your device.",
    });
  };
}
