import { useQuery } from "@tanstack/react-query";
import { getBatches } from "../services/batchesApi";

function useGetBatches() {
  const { data, isPending } = useQuery({
    queryFn: getBatches,
    queryKey: ["batches"],
  });

  return { data: data?.data?.data, isPending };
}

export default useGetBatches;
