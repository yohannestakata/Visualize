import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

function Classrooms() {
  const { data: classroomData } = useQuery({
    queryFn: () =>
      axios({
        method: "get",
        url: `${SERVER_URL}/classrooms`,
      }),

    queryKey: ["classrooms"],
  });

  const classrooms = classroomData?.data?.data;
  console.log(classrooms);
  return (
    <div className="grid grid-cols-9 gap-4">
      {classrooms?.map((classroom) => {
        console.log(classroom);
        return (
          <NavLink
            to={`/teacher/edit-classroom?classroomId=${classroom?._id}`}
            key={classroom?._id}
            className="col-span-3 cursor-pointer rounded-lg border bg-card p-3 text-card-foreground hover:bg-accent"
          >
            <div className="aspect-photo overflow-hidden rounded ">
              <img
                src={classroom?.models[0].thumbnailUrl}
                alt=""
                className="aspect-photo rounded object-cover"
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <h2 className="font-semibold">{classroom.name}</h2>
              <Button
                variant="ghost"
                className="h-fit w-fit p-0 hover:underline"
              >
                Edit
              </Button>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}

export default Classrooms;
