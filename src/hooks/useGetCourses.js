import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../data/globals";

function useGetCourses() {
  const { data, isPending } = useQuery({
    queryFn: () => {
      return axios({
        url: `${SERVER_URL}/courses`,
        method: "get",
      });
    },
    queryKey: ["courses"],
  });

  return { data: data?.data?.data, isPending };
}

export default useGetCourses;
