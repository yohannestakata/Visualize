import { useQuery } from "@tanstack/react-query";
import { getModel } from "../services/modelApi";

function useGetModel(id) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getModel(id),
    queryKey: ["model", id],
    onSuccess: (data) => console.log(data),
  });

  return { data, isLoading, error };
}

export default useGetModel;
