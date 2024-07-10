import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UploadModelSchema } from "../../../schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronsRight, FolderPlus, Loader2 } from "lucide-react";
import DragArea from "../../../components/DragArea";
import useUploadModel from "../hooks/useUploadModel";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import useUser from "../../../hooks/useUser";

function PrepareModelForm() {
  const [selectedButton, setSelectedButton] = useState("");
  const { user } = useUser();

  const { data: semesters } = useQuery({
    queryKey: ["open-semesters"],
    queryFn: () => {
      return axios({
        url: `${SERVER_URL}/semesters?open=true`,
        method: "get",
      });
    },
  });

  const { data: departmentData } = useQuery({
    queryKey: ["departments"],
    queryFn: () => axios({ url: `${SERVER_URL}/departments`, method: "get" }),
  });

  const departments = departmentData?.data?.data;

  const openSemesters = semesters?.data?.data;

  const teacherDepartments = new Set();
  let teacherCourses = [];

  const form = useForm({
    resolver: zodResolver(UploadModelSchema),
    defaultValues: { modelTitle: "" },
    mode: "onChange",
  });

  openSemesters?.forEach((semester) =>
    semester.batches.forEach((batch) =>
      batch.sections.forEach((section) => {
        user?.sections.forEach((userSection) => {
          if (userSection === section._id) {
            teacherDepartments.add(batch.department);
          }
        });
      }),
    ),
  );

  const departmentInput = form.watch("department");

  if (departmentInput) {
    openSemesters?.forEach((semester) =>
      semester.batches.forEach((batch) =>
        batch.courses.forEach((course) => {
          if (course.teacher === user._id) teacherCourses.push(course);
        }),
      ),
    );

    teacherCourses = teacherCourses?.filter((course) => {
      if (course.departments.find((dep) => dep === departmentInput))
        return true;
      else return false;
    });
  }

  const teacherDepartmentsObj = departments?.filter((dep) => {
    if ([...teacherDepartments].find((teachDep) => teachDep === dep._id))
      return true;
    else return false;
  });

  const {
    mutate: uploadModel,
    isPending,
    isSuccess,
  } = useUploadModel(selectedButton);

  function onSubmit(values) {
    uploadModel(values);
  }

  return (
    <div className="mt-4">
      <Form {...form}>
        <form
          disabled={isPending}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DragArea field={field} errors={form.formState.errors} />
                </FormControl>
              </FormItem>
            )}
          />
          <h2 className="font-semibold">Model Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="modelTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model title</FormLabel>
                  <FormControl>
                    <Input placeholder="Model title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnail"
              // eslint-disable-next-line no-unused-vars
              render={({ field: { value, onChange, ...fieldProps } }) => {
                return (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        placeholder="Model title"
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                          onChange(event.target.files && event.target.files[0])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teacherDepartmentsObj.map((dep) => {
                        return (
                          <SelectItem key={dep._id} value={dep._id}>
                            {dep.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teacherCourses?.map((course) => (
                        <SelectItem key={course._id} value={course._id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setSelectedButton("drafts")}
              variant="secondary"
              type="submit"
              disabled={isPending || isSuccess}
            >
              <span className="flex items-center">
                <FolderPlus className="mr-2 h-4 w-4" />
                Add to drafts
              </span>
            </Button>

            <Button
              onClick={() => setSelectedButton("publish")}
              type="submit"
              disabled={isPending || isSuccess}
            >
              <span className="flex items-center">
                <ChevronsRight className="mr-2 h-4 w-4" /> Next
              </span>
            </Button>
            {isPending && (
              <div className="flex animate-pulse items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {selectedButton === "drafts" && (
                  <span>Adding to drafts...</span>
                )}
                {selectedButton === "publish" && <span>Uploading...</span>}
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

export default PrepareModelForm;
