import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSemester } from "../services";

function useUpdateSemester() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ([id, fields]) => updateSemester(id, fields),
    onSuccess: () => {
      queryClient.invalidateQueries(["semesters"]);
    },
  });

  return { mutate, isPending };
}

export default useUpdateSemester;
