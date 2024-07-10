import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCourseFromBatch } from "../services";

function useRemoveCourseFromBatch() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ([batchId, courseId]) =>
      removeCourseFromBatch(batchId, courseId),
    onSuccess: () => {
      queryClient.invalidateQueries(["semesters"]);
    },
  });

  return { mutate, isPending };
}

export default useRemoveCourseFromBatch;
