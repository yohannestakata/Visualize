import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDepartment } from "../services";
import { useNavigate } from "react-router-dom";

function useUpdateDepartment(id) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (fields) => updateDepartment(id, fields),
    onSuccess: () => {
      navigate("/admin/department-settings");
      queryClient.invalidateQueries(["departments"]);
    },
  });

  return { mutate, isPending };
}

export default useUpdateDepartment;
