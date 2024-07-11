import { useMutation } from "@tanstack/react-query";
import { createBatch } from "../services";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

function useCreateBatch() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: createBatch,
    onSuccess: () => {
      toast({
        title: "Batch and sections created!",
        description: "Students can register once batch is added to semester.",
      });
      navigate("/admin");
    },
  });

  return { mutate, isPending };
}

export default useCreateBatch;
