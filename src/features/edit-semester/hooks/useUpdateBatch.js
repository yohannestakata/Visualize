import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBatch } from "../services";

function useUpdateBatch() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ([id, fields]) => updateBatch(id, fields),
    onSuccess: () => {
      queryClient.invalidateQueries(["semesters"]);
    },
  });

  return { mutate, isPending };
}

export default useUpdateBatch;
