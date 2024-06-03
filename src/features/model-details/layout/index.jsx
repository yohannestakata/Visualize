import { useNavigate, useSearchParams } from "react-router-dom";
import useGetModel from "../../../hooks/useGetModel";
import Heading from "../../../components/Heading";
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
import { Edit2, EyeOffIcon, Loader2, Save, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditModelSchema } from "../../../schema";
import ImageDragArea from "../components/ImageDragArea";

function ModelDetailsLayout() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("model-id");
  const { data: model, isPending: gettingModel } = useGetModel(id);

  const form = useForm({
    resolver: zodResolver(EditModelSchema),
    defaultValues: {
      modelTitle: model?.modelTitle,
      department: model?.department,
      course: model?.course,
    },
    mode: "onChange",
  });

  function onSubmit(values) {
    console.log(values);
  }

  const navigate = useNavigate();
  if (gettingModel) return <Loader2 />;

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-4 col-end-10 rounded-lg">
        <div className="flex items-center justify-between">
          <Heading as={"h1"}>Model Details</Heading>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center"
              onPointerDown={() =>
                navigate(`/teacher/add-model-definitions?modelId=${id}`)
              }
            >
              <Edit2 className="mr-2 h-4 w-4" />
              <span>Edit definitions</span>
            </Button>
            <Button
              size="sm"
              variant={`${model?.drafted ? "" : "destructive"}`}
            >
              {model?.drafted ? (
                <div className="flex items-center justify-between">
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Publish</span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <EyeOffIcon className="mr-2 h-4 w-4" />
                  <span>Unpublish</span>
                </div>
              )}
            </Button>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageDragArea
                        field={field}
                        errors={form.formState.errors}
                        imageUrl={model?.thumbnailUrl}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <h2 className="font-semibold">Model Information</h2>
              <div className="grid grid-cols-1 gap-4">
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
                          <SelectItem value="accounting">Accounting</SelectItem>
                          <SelectItem value="architecture">
                            Architecture
                          </SelectItem>
                          <SelectItem value="computer science">
                            Computer Science
                          </SelectItem>
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
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-4">
                <Button type="submit">
                  <span className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Save changes
                  </span>
                </Button>

                {/* {
                  <div className="flex animate-pulse items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />

                    <span>Adding to drafts...</span>
                  </div>
                } */}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ModelDetailsLayout;
