import Heading from "../../../components/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown, Plus, Wand2 } from "lucide-react";
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
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function EditClassroomLayout() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [modelValue, setModelValue] = useState("");
  const { user } = useUser();
  const { data: departmentData } = useQuery({
    queryKey: ["departments"],
    queryFn: () => axios({ url: `${SERVER_URL}/departments`, method: "get" }),
  });
  const { data: semesters } = useQuery({
    queryKey: ["open-semesters"],
    queryFn: () => {
      return axios({
        url: `${SERVER_URL}/semesters?open=true`,
        method: "get",
      });
    },
  });
  const openSemesters = semesters?.data?.data;

  const teacherDepartments = new Set();
  let teacherCourses = [];

  openSemesters?.forEach((semester) =>
    semester.batches.forEach((batch) =>
      batch.sections.forEach((section) => {
        user?.sections?.forEach((userSection) => {
          if (userSection === section._id) {
            teacherDepartments.add(batch.department);
          }
        });
      }),
    ),
  );

  const departments = departmentData?.data?.data;
  const teacherDepartmentsObj = departments?.filter((dep) => {
    if ([...teacherDepartments].find((teachDep) => teachDep === dep._id))
      return true;
    else return false;
  });

  const [inputs, setInputs] = useState({
    department: "",
    course: "",
    name: "",
    models: [],
    sections: user?.sections,
    teacher: user?._id,
  });

  if (inputs.department) {
    openSemesters?.forEach((semester) =>
      semester.batches.forEach((batch) =>
        batch.courses.forEach((course) => {
          if (course.teacher === user._id) teacherCourses.push(course);
        }),
      ),
    );

    teacherCourses = teacherCourses?.filter((course) => {
      if (course.departments.find((dep) => dep === inputs.department))
        return true;
      else return false;
    });
  }

  function handleAddModel() {
    setInputs((prev) => ({
      ...prev,
      models: [...new Set([...prev.models, modelValue])],
    }));
    setModelValue();
  }

  const { data } = useQuery({
    queryKey: ["models"],
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/models`,
        method: "get",
      }),
  });

  const models = data?.data?.data;

  const hasAllValues = () => {
    const requiredProperties = ["department", "course", "name", "models"];
    return requiredProperties.every((prop) => inputs[prop].length !== 0);
  };

  const navigate = useNavigate();

  const { mutate: createClassroom } = useMutation({
    mutationFn: (fields) =>
      axios({
        url: `${SERVER_URL}/classrooms`,
        method: "post",
        data: fields,
      }),

    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Classroom created!",
        description: "Add test to complete configuration.",
      });
      navigate(
        `/teacher/add-classroom-test?classroomId=${data?.data?.data?._id}`,
      );
    },
  });

  function handleCreateClassroom() {
    if (hasAllValues()) createClassroom(inputs);
  }

  return (
    <div>
      <div className="mt-4 grid grid-cols-9 gap-4">
        <div className="col-span-3">
          <div className="sticky top-20  flex flex-col gap-6">
            <Heading>Create Classroom</Heading>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={inputs.name}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="sections">Department</Label>
              <Select
                onValueChange={(value) =>
                  setInputs((prev) => ({ ...prev, department: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {teacherDepartmentsObj?.map((dep) => {
                    return (
                      <SelectItem key={dep._id} value={dep._id}>
                        {dep.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="course">Course</Label>
              <Select
                onValueChange={(value) =>
                  setInputs((prev) => ({ ...prev, course: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {teacherCourses?.map((course) => (
                    <SelectItem key={course._id} value={course._id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="sections">Models</Label>
              <div className="flex gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {modelValue
                        ? models.find((models) => models._id === modelValue)
                            ?.modelTitle
                        : "Select model..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search framework..." />
                      <CommandEmpty>No model found.</CommandEmpty>
                      <CommandList>
                        {models?.map((model) => (
                          <CommandItem
                            key={model._id}
                            value={model._id}
                            onSelect={(currentValue) => {
                              setModelValue(
                                currentValue === modelValue ? "" : currentValue,
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={`
                            mr-2 h-4 w-4 
                           ${
                             modelValue === model._id
                               ? "opacity-100"
                               : "opacity-0"
                           }
                          `}
                            />
                            {model?.modelTitle}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Button
                  variant="secondary"
                  onMouseDown={handleAddModel}
                  disabled={!modelValue}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
            <Button onClick={handleCreateClassroom}>
              <Wand2 className="mr-2 h-4 w-4" /> Create
            </Button>
          </div>
        </div>
        <div className="col-span-6 ">
          <h2 className="text-xl font-semibold">Added models</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {models
              ?.filter((model) => {
                if (inputs.models.find((modelId) => modelId === model._id))
                  return true;
              })
              .map((model) => {
                return (
                  <div
                    key={model._id}
                    className="rounded-lg border bg-card p-3 text-card-foreground hover:bg-accent"
                  >
                    <div className="aspect-photo overflow-hidden rounded-lg  ">
                      <img
                        src={model.thumbnailUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="mt-2 inline-block font-semibold">
                      {model.modelTitle}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditClassroomLayout;
