import { useMutation } from "@tanstack/react-query";
import { createBatch } from "../services";

function useCreateBatch() {
  const { mutate, isPending } = useMutation({
    mutationFn: createBatch,
  });

  return { mutate, isPending };
}

export default useCreateBatch;
