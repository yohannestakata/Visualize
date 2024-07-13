import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import useUser from "../../../hooks/useUser";

function Classrooms() {
  const { user } = useUser();
  const userSections = user?.sections;

  const { data: classroomData } = useQuery({
    queryKey: ["classrooms"],
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/classrooms?sections=${userSections}`,
      }),
  });

  const classrooms = classroomData?.data?.data;

  const classroomsPerCourse = classrooms?.reduce((acc, curr) => {
    if (!acc[curr.course.name]) acc[curr.course.name] = [];
    acc[curr.course.name] = [...acc[curr.course.name], curr];
    return acc;
  }, {});

  console.log(classroomsPerCourse);

  return (
    <div className="flex flex-col gap-4">
      {classroomsPerCourse
        ? Object.keys(classroomsPerCourse)?.map((key) => (
            <div key={key}>
              <h2 className="text-lg font-semibold">{key}</h2>
              <div className="mt-4 grid cursor-pointer grid-cols-2 gap-4">
                {classroomsPerCourse[key].map((course) => (
                  <div
                    key={course._id}
                    className="col-span-1 rounded-lg border bg-card p-3 text-card-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <div>
                      <img
                        src={course.models[0].thumbnailUrl}
                        alt=""
                        className="h-full w-full rounded-lg object-cover"
                      />
                    </div>
                    <div className="mt-2 flex flex-col gap-1">
                      <span className="font-semibold">{course.name}</span>
                      <span>{course.teacher[0].nickname}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        : ""}
    </div>
  );
}

export default Classrooms;
