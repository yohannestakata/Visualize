import { useMutation } from "@tanstack/react-query";
import { uploadModel } from "../services";

function useUploadModel() {
  const { mutate, isLoading, data } = useMutation({
    mutationFn: uploadModel,
  });

  return { mutate, isLoading, data };
}

export default useUploadModel;
