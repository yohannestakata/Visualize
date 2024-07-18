import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { buttonVariants } from "@/components/ui/button";

import { NavLink } from "react-router-dom";

function AnalyticsLayout() {
  const { data: classroomData } = useQuery({
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/classrooms`,
        method: "get",
      }),
    queryKey: ["classrooms"],
  });

  const classrooms = classroomData?.data?.data;

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

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="grid grid-cols-9 gap-4">
      {classrooms?.map((classroom) => {
        const classroomActivity = classroom.activities
          .map((activity) => getDayOfWeek(activity))
          .reduce((acc, curr) => {
            let dataIndex;

            acc?.forEach((data, i) => {
              if (data.day === curr) dataIndex = i;
            });

            if (dataIndex || dataIndex === 0) acc[dataIndex].activity += 1;
            else
              acc.push({
                day: curr,
                activity: 1,
              });

            return acc;
          }, []);
        console.log(classroom);
        return (
          <div
            key={classroom._id}
            className="col-span-3 rounded-lg border bg-card p-3"
          >
            <div className="aspect-photo rounded-lg bg-accent">
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={classroomActivity}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />

                  <Area
                    dataKey="activity"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.4}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="activity"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
            <div className="mt-2 flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-semibold">{classroom.name}</span>
                <span className="">{classroom.department[0].name}</span>
              </div>
              <span>
                <NavLink
                  to={`/teacher/analytics/details?classroomId=${classroom._id}`}
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Details
                </NavLink>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AnalyticsLayout;
