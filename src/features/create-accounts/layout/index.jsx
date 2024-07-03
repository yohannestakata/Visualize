import Heading from "../../../components/Heading";

("use client");

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useGetDepartments from "../../../hooks/useGetDepartments";
import { Send } from "lucide-react";
import useCreateUser from "../hooks/useCreateUser";

const FormSchema = z.object({
  nickname: z.string().min(2, {
    message: "Nickname must be at least 2 characters.",
  }),
  role: z.string().min(5, { message: "Please pick a role" }),
  department: z.string(),
  uniId: z.string().min(8),
  password: z.string().min(8),
});

export function CreateAccountsLayout() {
  const { data: departments, isPending: isGettingDepartments } =
    useGetDepartments();

  const formDefaults = {
    nickname: "",
    role: "admin",
    department: "",
    password: "",
    uniId: "",
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: formDefaults,
  });

  const { mutate: createUser, isPending } = useCreateUser();

  function onSubmit(data) {
    if (data.role === "teacher") delete data.department;
    createUser({ ...data, department: [data.department] });
    form.reset(formDefaults);
  }

  return (
    <div className="mt-6 grid grid-cols-9 gap-4">
      <div className="col-span-7 col-start-3">
        <Heading as="h1">Create Accounts</Heading>
        <div className="mt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nickname</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name here" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the users public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="uniId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter University ID here"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This will be used for authentication.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role for the user" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="teacher">Teacher</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Roles can&apos;t be changed once set.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {form.getValues("role") === "admin" && !isGettingDepartments && (
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
                            <SelectValue placeholder="Select users' department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments
                            ?.sort((curr, next) =>
                              curr.name.toLowerCase() < next.name.toLowerCase()
                                ? -1
                                : 1,
                            )
                            ?.map((dep) => {
                              return (
                                <SelectItem value={dep?._id} key={dep?._id}>
                                  {dep?.name}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Sets user as departments admin.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter password here" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                <Send className="mr-2 h-4 w-4" /> Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountsLayout;
