import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { SERVER_URL } from "../../../data/globals";
import Heading from "../../../components/Heading";
import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";

function ClassroomModelsLayout() {
  const [searchParams] = useSearchParams();
  const classroomId = searchParams.get("classroomId");

  const { data: classroomData } = useQuery({
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/classrooms/${classroomId}`,
        method: "get",
      }),
    queryKey: ["classroom", classroomId],
  });

  const classroom = classroomData?.data?.data;
  console.log(classroom);

  const navigate = useNavigate();

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <Heading>{classroom?.name}</Heading>
        {classroom?.exam?.length ? (
          <Button
            onClick={() =>
              navigate(
                `/learn/classroom/take-exam?classroomId=${classroom?._id}`,
              )
            }
          >
            <PencilLine className="mr-2 h-4 w-4" /> Take Exam
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className="mt-4 grid grid-cols-9 gap-4">
        {classroom?.models?.map((model) => (
          <NavLink
            to={`/learn/learn-model?modelId=${model._id}`}
            key={model._id}
            className="col-span-3 rounded-lg border bg-card p-3"
          >
            <div className="aspect-photo overflow-hidden">
              <img
                src={model.thumbnailUrl}
                alt=""
                className="aspect-photo h-full w-full rounded-lg object-cover"
              />
            </div>
            <div className="mt-2">{model.modelTitle}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default ClassroomModelsLayout;
