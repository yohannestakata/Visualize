import { Check, ChevronsUpDown, Loader2, Minus, Plus } from "lucide-react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import useGetSemesters from "../../../hooks/useGetSemesters";
import { useEffect, useState } from "react";
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
import useGetBatches from "../../../hooks/useGetBatches";
import useUpdateSemester from "../hooks/useUpdateSemester";
import useUpdateBatch from "../hooks/useUpdateBatch";
import useRemoveCourseFromBatch from "../hooks/useRemoveCourseFromBatch";

function EditSemesterLayout() {
  const [open, setOpen] = useState(false);
  const [openBatch, setOpenBatch] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatchCombo, setSelectedBatchCombo] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: semesters, isPending: isGettingSemesters } = useGetSemesters();
  const semesterId = searchParams.get("semesterId");
  const semester = semesters?.find((semester) => semester._id === semesterId);

  const { data: courses, isPending: isGettingCourses } = useGetCourses();
  const { data: batches, isPending: isGettingBatches } = useGetBatches();
  const selectedBatch = semester?.batches?.find(
    (batch) => batch._id === searchParams.get("batchId"),
  );

  const [selectedBatchCourses, setSelectedBatchCourses] = useState([]);
  const [semesterBatches, setSemesterBatches] = useState([]);

  const { mutate: updateSemester, isPending: isUpdatingSemester } =
    useUpdateSemester();

  const { mutate: updateBatch, isPending: isUpdatingBatch } = useUpdateBatch();

  const { mutate: removeCourse, isPending: isRemovingCourse } =
    useRemoveCourseFromBatch();

  useEffect(() => {
    setSelectedBatchCourses(selectedBatch?.courses);
  }, [selectedBatch?.courses]);

  useEffect(() => {
    setSemesterBatches(semester?.batches);
  }, [semester?.batches]);

  function handleAddCourses() {
    if (!selectedCourse) return;

    updateBatch([selectedBatch?._id, { courses: selectedCourse }]);
    setSelectedCourse();
  }

  function handleRemoveCourse(id) {
    removeCourse([selectedBatch?._id, id]);
  }

  function handleAddBatch() {
    setSelectedBatchCombo("");
    updateSemester([semester?._id, { batches: selectedBatchCombo }]);
  }

  const navigate = useNavigate();

  if (isGettingSemesters || isGettingCourses || isGettingBatches)
    return <Loader2 className="animate-spin" />;

  return (
    <div>
      <div className="mt-4 grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex flex-col justify-between gap-2 border-b px-4 py-2 font-semibold  lg:px-4">
              <span className="font-semibold">Batches</span>
              <div className="flex items-center gap-2">
                <Popover open={openBatch} onOpenChange={setOpenBatch}>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={!semester.open}
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {batches
                        ? batches?.find(
                            (batch) => batch._id === selectedBatchCombo,
                          )?.year
                        : "Select batch..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search batch..." />
                      <CommandEmpty>No batch found.</CommandEmpty>
                      <CommandList>
                        {batches
                          ?.filter((batch) =>
                            semesterBatches.find(
                              (semesterBatch) =>
                                semesterBatch._id === batch._id,
                            )
                              ? false
                              : true,
                          )
                          ?.map((batch) => (
                            <CommandItem
                              key={batch._id}
                              value={batch._id}
                              onSelect={(currentValue) => {
                                setSelectedBatchCombo(
                                  currentValue === selectedBatchCombo
                                    ? ""
                                    : currentValue,
                                );

                                setOpenBatch(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4
                              ${
                                selectedBatchCombo === batch._id
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                              />
                              {batch.year}
                            </CommandItem>
                          ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Button
                  variant="outline"
                  onMouseDown={handleAddBatch}
                  disabled={!selectedBatchCombo || !semester.open}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {semesterBatches?.map((batch) => (
                  <Button
                    key={batch._id}
                    className={`justify-start rounded-md px-4 py-2 hover:bg-primary hover:text-primary-foreground ${batch._id === selectedBatch?._id ? "bg-primary text-primary-foreground" : ""}`}
                    variant="ghost"
                    onMouseDown={() => {
                      searchParams.set("batchId", batch._id);
                      setSearchParams(searchParams);
                    }}
                  >
                    {batch.year}
                  </Button>
                ))}
                {isUpdatingSemester && (
                  <Loader2 className="ml-4 mt-2 h-4 w-4 animate-spin" />
                )}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="flex w-full appearance-none items-center shadow-none  ">
              <h1 className="text-lg font-semibold md:text-2xl">
                Added Courses
              </h1>
              <div className="ml-auto flex items-center gap-4">
                <div
                  className={`flex items-center gap-2 rounded-full px-2 py-1 leading-none  ${semester.open ? "bg-primary" : "bg-destructive"}`}
                >
                  <span
                    className={`${semester.open ? "text-primary-foreground" : "text-destructive-foreground"}`}
                  >
                    {semester.open ? "Open" : "Closed"}
                  </span>
                </div>
                <div className="text-2xl font-semibold">
                  {semester?.year} / {semester?.half}
                </div>
              </div>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="flex w-1/3 items-center gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={!selectedBatch || !semester.open}
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {selectedCourse
                        ? courses?.find(
                            (course) => course._id === selectedCourse,
                          )?.name
                        : "Select course..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search course..." />
                      <CommandEmpty>No course found.</CommandEmpty>
                      <CommandList>
                        {courses
                          ?.filter((course) => {
                            if (
                              selectedBatchCourses?.find(
                                (selectedBatchCourse) =>
                                  selectedBatchCourse._id === course._id,
                              )
                            )
                              return false;
                            else return true;
                          })
                          ?.map((course) => (
                            <CommandItem
                              key={course._id}
                              value={course._id}
                              onSelect={(currentValue) => {
                                setSelectedCourse(
                                  currentValue === selectedCourse
                                    ? ""
                                    : currentValue,
                                );

                                setOpen(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4
                              ${
                                selectedCourse === course._id
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                              />
                              {course.name}
                            </CommandItem>
                          ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Button
                  variant="outline"
                  onMouseDown={handleAddCourses}
                  disabled={!selectedBatch || !semester.open}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add
                </Button>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border p-3 shadow-sm">
              <div className="flex w-full flex-col items-center gap-1 ">
                <Table>
                  <TableCaption>
                    Courses added in {selectedBatch?.year} batch.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">Number</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Credit Hour</TableHead>
                      <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedBatchCourses?.map((course) => {
                      return (
                        <TableRow
                          key={course._id}
                          onMouseDown={() =>
                            navigate(
                              `/admin/semesters/courses?courseId=${course._id}&semesterId=${semester._id}&selectedBatch=${selectedBatch._id}&courseName=${course.name}`,
                            )
                          }
                          className="cursor-pointer"
                        >
                          <TableCell className="font-medium">
                            {course.number}
                          </TableCell>
                          <TableCell> {course.name}</TableCell>
                          <TableCell className="text-right">
                            {course.creditHour}
                          </TableCell>
                          <TableCell className="text-right">
                            <div
                              className="ml-auto aspect-square h-fit w-fit cursor-pointer rounded-md border p-1 hover:bg-destructive hover:text-destructive-foreground"
                              onClick={() => handleRemoveCourse(course._id)}
                            >
                              <Minus className="h-4 w-4" />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default EditSemesterLayout;
