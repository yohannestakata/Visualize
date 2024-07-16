import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function TakeExamLayout() {
  const [searchParams] = useSearchParams();

  const { data } = useQuery({});
  return <div>{searchParams.get("classroomId")}</div>;
}

export default TakeExamLayout;
