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
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditModelSchema } from "../../../schema";
import ImageDragArea from "../components/ImageDragArea";
import useUpdateModel from "../../../hooks/useUpdateModel";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

function UpdateModelForm({ model, id }) {
  const form = useForm({
    resolver: zodResolver(EditModelSchema),
    mode: "onChange",
    defaultValues: {
      department: "",
      course: "",
      modelTitle: "",
    },
  });

  useEffect(() => {
    form.setValue("department", model?.department);
    form.setValue("course", model?.course);
    form.setValue("modelTitle", model?.modelTitle);
  }, [model, form]);

  const { mutate: updateModel, isPending: isUpdatingModel } =
    useUpdateModel(id);

  function onSubmit(values) {
    updateModel(values);
  }

  return (
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
                    <SelectItem value="architecture">Architecture</SelectItem>
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
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isUpdatingModel}>
            <span className="flex items-center">
              <Save className="mr-2 h-4 w-4" />
              Save changes
            </span>
          </Button>

          {isUpdatingModel && (
            <div className="flex animate-pulse items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />

              <span>Updating model...</span>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}

export default UpdateModelForm;
