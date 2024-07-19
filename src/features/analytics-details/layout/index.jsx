import { useSearchParams } from "react-router-dom";
import Heading from "../../../components/Heading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

function AnalyticsDetailsLayout() {
  const [searchParams] = useSearchParams();
  const classroomId = searchParams.get("classroomId");

  function getDayOfWeek(isoString) {
    const date = new Date(isoString);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[date.getDay()];
  }

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

  const students = usersData?.data?.data?.filter(
    (user) => user.role.toLowerCase() === "student",
  );

  const classrooms = classroomData?.data?.data;

  const classroom = classrooms?.find(
    (classroom) => classroom._id === classroomId,
  );
  const [selectedStudentId, setSelectedStudentId] = useState();

  const { data: userData } = useQuery({
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/users`,
        method: "get",
      }),
  });

  const users = userData?.data?.data;

  const selectedStudent = users?.find((user) => user._id === selectedStudentId);
  console.log(selectedStudent);

  const graphData = selectedStudent?.scores?.map((score) => ({
    ...score,
    date: getDayOfWeek(score.date),
  }));

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
                  <AccordionContent>
                    <div className="flex flex-col gap-1">
                      {students?.map((student) => {
                        if (
                          student.sections.find(
                            (studSection) => section._id === studSection._id,
                          )
                        )
                          return (
                            <Button
                              key={student._id}
                              onMouseDown={() =>
                                setSelectedStudentId(student._id)
                              }
                              variant={
                                selectedStudentId === student._id
                                  ? "default"
                                  : "secondary"
                              }
                              size="sm"
                              className="justify-start"
                            >
                              <span>{student.nickname}</span> &nbsp;-&nbsp;
                              <span>{student.uniId}</span>
                            </Button>
                          );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
      <div className="col-span-6">
        <div className="text-3xl font-semibold">
          {selectedStudent?.nickname}
        </div>
        <div className="mt-4">
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={graphData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="score" fill="var(--color-desktop)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDetailsLayout;
