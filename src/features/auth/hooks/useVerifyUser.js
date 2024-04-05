import { useQuery } from "react-query";
import { verifyUser } from "../services";

function useVerifyUser() {
  const { data, isLoading } = useQuery({
    queryFn: verifyUser,
  });

  return { data: data?.data, isLoading };
}

export default useVerifyUser;
