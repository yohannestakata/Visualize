import { useSearchParams } from "react-router-dom";
import Heading from "../../../components/Heading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function AnalyticsDetailsLayout() {
  const [searchParams] = useSearchParams();
  const classroomId = searchParams.get("classroomId");

  const { data: classroomData } = useQuery({
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/classrooms`,
        method: "get",
      }),
    queryKey: ["classrooms", classroomId],
  });

  const { data: usersData } = useQuery({
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/users`,
        method: "get",
      }),
    queryKey: ["users"],
  });

  console.log();

  const students = usersData?.data?.data?.filter(
    (user) => user.role.toLowerCase() === "student",
  );

  const classrooms = classroomData?.data?.data;

  const classroom = classrooms?.find(
    (classroom) => classroom._id === classroomId,
  );

  console.log(classroom);
  return (
    <div className="grid grid-cols-9 gap-4">
      <div className="col-span-3">
        <Heading>{classroom?.name} Analytics</Heading>
        <div className="mt-4">
          <span className="text-xl font-semibold">Sections</span>
          <Accordion type="single" collapsible>
            {classroom?.sections?.map((section) => {
              return (
                <AccordionItem value={section._id} key={section._id}>
                  <AccordionTrigger>{section.name}</AccordionTrigger>
                  <AccordionContent>All</AccordionContent>
                  <AccordionContent>
                    {students?.map((student) => {
                      if (
                        student.sections.find(
                          (studSection) => section._id === studSection._id,
                        )
                      )
                        return student.nickname;
                    })}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
      <div className="col-span-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, vel,
        quis perspiciatis asperiores nam laboriosam quia deleniti consequuntur
        neque molestiae soluta non voluptas ea quos quam saepe error,
        accusantium velit.
      </div>
    </div>
  );
}

export default AnalyticsDetailsLayout;
