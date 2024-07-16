import { useSearchParams } from "react-router-dom";
import useGetSemesters from "../../../hooks/useGetSemesters";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import {
  Command,
  CommandEmpty,
  CommandList,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function CourseSetupLayout() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const selectedBatchId = searchParams.get("selectedBatch");
  const { data: semesters, isPending: isGettingSemesters } = useGetSemesters();
  const semesterId = searchParams.get("semesterId");
  const semester = semesters?.find((semester) => semester._id === semesterId);
  const selectedBatch = semester?.batches.find(
    (batch) => batch._id === selectedBatchId,
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { toast } = useToast();

  const [selectedSection, setSelectedSection] = useState("");

  const { data: users } = useQuery({
    queryKey: ["users", semesterId, courseId],
    queryFn: () => {
      return axios({
        url: `${SERVER_URL}/users`,
        method: "get",
      });
    },
  });

  const teachers = users?.data?.data?.filter(
    (user) => user.role.toLowerCase() === "teacher",
  );

  const depStuds = users?.data?.data
    .filter((user) =>
      user.sections.find((sect) => sect._id === selectedSection) ? true : false,
    )
    .filter((user) => user.role.toLowerCase() === "student");

  const { mutate: updateTeacher, isPending: isUpdatingTeacher } = useMutation({
    mutationFn: ([teacherId, fields]) => {
      return axios({
        url: `${SERVER_URL}/users/${teacherId}`,
        method: "patch",
        data: fields,
      });
    },

    onSuccess: () => {
      toast({
        title: "Teacher assigned section!",
        description: "Teacher will manage classrooms for assigned section",
      });
    },
  });

  const { mutate: updateCourse, isPending: isUpdatingCourse } = useMutation({
    mutationFn: ([courseId, fields]) => {
      return axios({
        url: `${SERVER_URL}/courses/${courseId}`,
        data: fields,
        method: "patch",
      });
    },
    onSuccess: () => {
      toast({
        title: "Course assigned teacher!",
        description: "Teacher will manage classrooms for assigned course",
      });
    },
  });

  function handleAddTeacher() {
    console.log({ teacher: value, section: selectedSection, course: courseId });
    updateTeacher([value, { sections: selectedSection }]);
    updateCourse([courseId, { teacher: value }]);
  }

  return (
    <div className="mt-4 grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex flex-col justify-between gap-2 border-b px-4 py-2 font-semibold  lg:px-4">
            <span className="font-semibold">Sections</span>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {selectedBatch?.sections.map((section) => {
                return (
                  <Button
                    key={section._id}
                    className={`justify-start rounded-md px-4 py-2 hover:bg-primary hover:text-primary-foreground `}
                    variant={`${selectedSection === section._id ? "default" : "ghost"}`}
                    onMouseDown={() => {
                      setSelectedSection(section._id);
                    }}
                  >
                    {section.name}
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <h1 className="text-2xl font-semibold">
            {searchParams.get("courseName")}
          </h1>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm text-muted-foreground">Teacher</span>
            <div className="flex items-center gap-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    disabled={
                      !selectedSection || isUpdatingTeacher || isUpdatingCourse
                    }
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {value
                      ? teachers.find((teacher) => teacher._id === value)
                          ?.nickname
                      : "Select teacher..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search teacher..." />
                    <CommandEmpty>No teacher found.</CommandEmpty>
                    <CommandList>
                      {teachers?.map((teacher) => (
                        <CommandItem
                          key={teacher._id}
                          value={teacher._id}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue,
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${value === teacher._id ? "opacity-100" : "opacity-0"}`}
                          />
                          {teacher.nickname}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button
                disabled={
                  !selectedSection ||
                  !value ||
                  isUpdatingTeacher ||
                  isUpdatingCourse
                }
                onMouseDown={handleAddTeacher}
              >
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
              This will assign the selected teacher to this course
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold">Registered Students</h1>
            <Table>
              <TableCaption>List of students.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Uni ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {depStuds?.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">
                      {user.nickname}
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.uniId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CourseSetupLayout;
