import { useQuery } from "@tanstack/react-query";
import { getModels } from "../services/modelApi";

function useGetModels(filter) {
  const { isPending, data } = useQuery({
    queryFn: () => getModels(filter),
    queryKey: ["models"],
  });

  return { isPending, data: data?.data };
}

export default useGetModels;
