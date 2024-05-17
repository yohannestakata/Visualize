import { useQuery } from "@tanstack/react-query";
import { verifyUser } from "../services";

function useVerifyUser() {
  const { data, isLoading } = useQuery({
    queryFn: verifyUser,
    queryKey: ["user-verify"],
  });

  return { data: data?.data, isLoading };
}

export default useVerifyUser;
