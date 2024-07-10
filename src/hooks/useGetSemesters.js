import { useQuery } from "@tanstack/react-query";
import { getSemesters } from "../services/semestersApi";

function useGetSemesters() {
  const { data, isPending } = useQuery({
    queryFn: getSemesters,
    queryKey: ["semesters"],
  });
  return { data: data?.data?.data, isPending };
}

export default useGetSemesters;
