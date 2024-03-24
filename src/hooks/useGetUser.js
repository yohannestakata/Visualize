import { useQuery } from "react-query";
import { getUser } from "../services/userApi";

function useGetUser() {
  const { data, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });
  return { data, isLoading };
}

export default useGetUser;
