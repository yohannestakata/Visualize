import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDepartment } from "../services";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function useUpdateDepartment(id) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: (fields) => updateDepartment(id, fields),
    onSuccess: () => {
      navigate("/super-admin/create-department");
      queryClient.invalidateQueries(["departments"]);
      toast({
        title: "Department updated!",
      });
    },
  });

  return { mutate, isPending };
}

export default useUpdateDepartment;
