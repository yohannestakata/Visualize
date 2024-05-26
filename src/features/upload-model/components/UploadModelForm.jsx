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
import { Loader2, Upload } from "lucide-react";
import DragArea from "../../../components/DragArea";
import useUploadModel from "../hooks/useUploadModel";

function UploadModelForm() {
  const { mutate: uploadModel, isPending, isSuccess } = useUploadModel();
  const form = useForm({
    resolver: zodResolver(UploadModelSchema),
    defaultValues: { modelTitle: "" },
    mode: "onChange",
  });

  function onSubmit(values) {
    uploadModel(values);
  }

  return (
    <div>
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
                            onChange(
                              event.target.files && event.target.files[0],
                            )
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
            <Button type="submit" disabled={isPending || isSuccess}>
              {isPending && (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </span>
              )}
              {!isPending && (
                <span className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UploadModelForm;
