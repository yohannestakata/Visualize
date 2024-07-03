import { useSearchParams } from "react-router-dom";
import useGetDepartments from "../../../hooks/useGetDepartments";
import Heading from "../../../components/Heading";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Minus, Plus, Save } from "lucide-react";
import useGetCourses from "../../../hooks/useGetCourses";
import { useEffect, useState } from "react";
import useUpdateDepartment from "../hooks";

function DepartmentSetupLayout() {
  const { data: courses, isPending: isGettingCourses } = useGetCourses();
  const [searchParams] = useSearchParams();
  const { data: departments, isPending: isGettingDepartments } =
    useGetDepartments();
  const depId = searchParams.get("depId");
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const [departmentCourses, setDepartmentCourses] = useState([]);
  const [courseInput, setCourseInput] = useState({
    name: "",
    creditHour: 0,
    number: "",
  });
  console.log(courseInput);
  const department = departments?.find((dep) => dep._id === depId);
  const { mutate: updateDepartment, isPending: isUpdatingDepartment } =
    useUpdateDepartment(department?._id);

  useEffect(() => {
    setDepartmentCourses(department?.courses);
    setDepartmentName(department?.name);
    setDepartmentDescription(department?.description);
  }, [department]);

  function handleAddCourse() {
    if (courseInput.name && courseInput.creditHour && courseInput.number) {
      setDepartmentCourses((prev) => [...prev, courseInput]);
      setCourseInput({ name: "", creditHour: 0, number: "" });
    }
  }

  function handleRemoveCourse(id) {
    setDepartmentCourses((prev) => prev.filter((course) => course._id !== id));
  }

  function handleSubmit() {
    updateDepartment({
      name: departmentName,
      description: departmentDescription,
      courses: departmentCourses.map((course) => course._id),
    });
  }

  if (isGettingCourses || isGettingDepartments) return <Loader2 />;

  return (
    <div>
      <div className="relative mt-6 grid grid-cols-12 gap-4">
        <div className="sticky top-20 col-span-4 flex h-fit flex-col gap-6">
          <Heading as="h1">{department?.name}</Heading>
          <div className="grid w-full items-center gap-1.5 bg-white">
            <Label htmlFor="name">Name</Label>
            <Input
              type="name"
              id="name"
              placeholder="Enter department name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
            />
            <span className="text-sm text-muted-foreground">
              This is the departments&apos; public display name.
            </span>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              type="name"
              id="description"
              placeholder="Enter department description"
              value={departmentDescription}
              onChange={(e) => setDepartmentDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 rounded-lg border p-6">
            <span>Course</span>
            <div className="grid w-full items-center gap-1.5">
              <div className="flex gap-2">
                <Input
                  type="text"
                  id="course"
                  placeholder="Enter course name"
                  value={courseInput.name}
                  onChange={(e) =>
                    setCourseInput((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Input
                type="text"
                id="course"
                placeholder="Enter course number"
                value={courseInput.creditHour}
                onChange={(e) =>
                  setCourseInput((prev) => ({
                    ...prev,
                    creditHour: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <div className="flex gap-2">
                <Input
                  type="number"
                  id="course"
                  placeholder="Enter credit hour"
                  value={courseInput.number}
                  onChange={(e) =>
                    setCourseInput((prev) => ({
                      ...prev,
                      number: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <Button variant="secondary" onMouseDown={handleAddCourse}>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
          <Button
            variant="default"
            onMouseDown={handleSubmit}
            disabled={isUpdatingDepartment}
          >
            <Save className="mr-2 h-4 w-4" />
            Save changes
          </Button>
        </div>
        <div className="col-span-8 col-start-5">
          <Table>
            <TableCaption>
              A list of courses in {department?.name}.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Course Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Credits</TableHead>
                <TableHead className="text-right">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departmentCourses
                ?.sort((curr, next) => (curr.name < next.name ? -1 : 1))
                ?.map((course) => {
                  return (
                    <TableRow key={course?._id}>
                      <TableCell className="font-medium">
                        {course?.number}
                      </TableCell>
                      <TableCell>{course?.name}</TableCell>
                      <TableCell className="text-right">
                        {course?.creditHour}
                      </TableCell>
                      <TableCell className="flex justify-end text-right">
                        <div className="cursor-pointer rounded-sm border p-1 hover:bg-secondary ">
                          <Minus
                            className="h-4 w-4"
                            onMouseDown={() => handleRemoveCourse(course._id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default DepartmentSetupLayout;
