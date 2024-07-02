import { useSearchParams } from "react-router-dom";
import useGetDepartments from "../../../hooks/useGetDepartments";
import Heading from "../../../components/Heading";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandList,
  CommandInput,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronsUpDown,
  Loader2,
  Minus,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import useGetCourses from "../../../hooks/useGetCourses";
import { useEffect, useState } from "react";
import useUpdateDepartment from "../hooks";
import { Separator } from "@/components/ui/separator";

function DepartmentSetupLayout() {
  const { data: courses, isPending: isGettingCourses } = useGetCourses();
  const [searchParams] = useSearchParams();
  const { data: departments, isPending: isGettingDepartments } =
    useGetDepartments();
  const depId = searchParams.get("depId");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const [departmentCourses, setDepartmentCourses] = useState([]);
  const department = departments?.find((dep) => dep._id === depId);
  const { mutate: updateDepartment, isPending: isUpdatingDepartment } =
    useUpdateDepartment(department?._id);

  useEffect(() => {
    setDepartmentCourses(department?.courses);
    setDepartmentName(department?.name);
    setDepartmentDescription(department?.description);
    setValue("");
  }, [department]);

  function handleAddCourse() {
    if (value) setDepartmentCourses((prev) => [...prev, value]);
    setValue("");
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
          <div className="grid w-full max-w-sm items-center gap-1.5">
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
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Description</Label>
            <Textarea
              type="name"
              id="name"
              rows={8}
              placeholder="Enter department description"
              value={departmentDescription}
              onChange={(e) => setDepartmentDescription(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="email">Course</Label>
            <div className="flex gap-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="flex-1 justify-between overflow-hidden"
                  >
                    {value
                      ? courses?.find((course) => course?.name === value.name)
                          ?.name
                      : "Select course..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0">
                  <Command>
                    <CommandInput placeholder="Search course..." />
                    <CommandList>
                      <CommandEmpty>No course found.</CommandEmpty>
                      <CommandGroup>
                        {courses
                          ?.sort((curr, next) =>
                            curr.name < next.name ? -1 : 1,
                          )
                          ?.filter((course) => {
                            if (
                              departmentCourses?.find(
                                (depCourse) => depCourse?.name === course?.name,
                              )
                            ) {
                              return;
                            } else return course;
                          })
                          ?.map((course) => (
                            <CommandItem
                              key={course?._id}
                              value={course}
                              onSelect={() => {
                                setValue(course);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === course
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {course.name}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button variant="secondary" onMouseDown={handleAddCourse}>
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>
          </div>
          <Button
            variant="default"
            onMouseDown={handleSubmit}
            disabled={isUpdatingDepartment}
          >
            <Save className="mr-2 h-4 w-4" />
            Save changes
          </Button>
          <Separator />
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
        <div className="col-span-8 col-start-5">
          <Table>
            <TableCaption>
              A list of courses in {department?.name}.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">UUID</TableHead>
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
                        {course?._id}
                      </TableCell>
                      <TableCell>{course?.name}</TableCell>
                      <TableCell className="text-right">
                        {course?.credits}
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
