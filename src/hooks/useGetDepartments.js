import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../services/departmentsApi";

function useGetDepartments() {
  const { data, isPending } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });
  return { data: data?.data?.data, isPending };
}

export default useGetDepartments;
