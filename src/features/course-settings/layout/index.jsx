import Heading from "../../../components/Heading";
import useGetCourses from "../../../hooks/useGetCourses";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function orderCourses(curr, next) {
  if (curr.name < next.name) return -1;
  else return 1;
}
function CourseSettingsLayout() {
  const { data: courses } = useGetCourses();
  console.log(courses);
  return (
    <div className="grid grid-cols-9 ">
      <div className="col-span-5 col-start-3  flex flex-col gap-6">
        <Heading as={"h1"}>Courses</Heading>
        <Table>
          <TableCaption>A list of all registered courses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">UUID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Credits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses?.sort(orderCourses)?.map((course) => {
              return (
                <>
                  <TableRow>
                    <TableCell className="font-medium">{course?._id}</TableCell>
                    <TableCell> {course?.name}</TableCell>
                    <TableCell className="text-right">
                      {course?.credits}
                    </TableCell>
                    <TableCell className="my-auto flex h-full items-center justify-end gap-4">
                      <span className="hover:underline">Edit</span>
                      <span className="text-destructive hover:underline">
                        Delete
                      </span>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CourseSettingsLayout;
