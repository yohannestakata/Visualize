import { useMutation } from "@tanstack/react-query";
import { updateModel } from "../services/modelApi";
import { useToast } from "@/components/ui/use-toast";

function useUpdateModel(id) {
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => updateModel(id, data),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your changes are saved.",
      });
    },
  });

  return { mutate, isPending };
}

export default useUpdateModel;
