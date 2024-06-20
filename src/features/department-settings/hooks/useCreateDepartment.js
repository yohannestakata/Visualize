import { useMutation } from "@tanstack/react-query";
import { createDepartment } from "../services";
import { useToast } from "@/components/ui/use-toast";

function useCreateDepartment() {
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      toast({
        title: "Success!",
        description:
          "New department has been created successfully. You can now edit it's courses and sections from it's settings page.",
      });
    },
  });

  return { mutate, isPending };
}

export default useCreateDepartment;
