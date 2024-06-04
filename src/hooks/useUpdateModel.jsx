import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateModel } from "../services/modelApi";
import { useToast } from "@/components/ui/use-toast";

function useUpdateModel(id) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => updateModel(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["model", "models"]);
      toast({
        title: "Success!",
        description: "Your changes are saved.",
      });
    },
  });

  return { mutate, isPending };
}

export default useUpdateModel;
