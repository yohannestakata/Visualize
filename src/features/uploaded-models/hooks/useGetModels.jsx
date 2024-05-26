import { useQuery } from "@tanstack/react-query";
import useUser from "../../../hooks/useUser";
import { getModelsTeacher } from "../services";

function useGetModels() {
  const { user } = useUser();

  const { isPending, data } = useQuery({
    queryFn: () => getModelsTeacher(user._id),
    queryKey: ["models"],
  });

  return { isPending, data:data?.data };
}

export default useGetModels;
