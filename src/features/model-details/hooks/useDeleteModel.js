import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteModel } from "../server";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

function useDeleteModel(id) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: () => deleteModel(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["models"]);
      navigate("/teacher/models");
      toast({
        title: "Success",
        description: "Model deleted successfully.",
      });
    },
  });

  return { isPending, mutate };
}

export default useDeleteModel;
