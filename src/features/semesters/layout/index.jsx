import Heading from "../../../components/Heading";
import useGetSemesters from "../../../hooks/useGetSemesters";
import { NavLink } from "react-router-dom";
import { Loader2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MagicWandIcon } from "@radix-ui/react-icons";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SERVER_URL } from "../../../data/globals";
import axios from "axios";
import useUser from "../../../hooks/useUser";
import { useToast } from "@/components/ui/use-toast";

function SemestersLayout() {
  const { data: semesters, isPending: isGettingSemester } = useGetSemesters();
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutate: createSemester, isPending: isCreatingSemester } = useMutation(
    {
      mutationFn: (fields) => {
        return axios({
          url: `${SERVER_URL}/semesters`,
          data: fields,
          method: "post",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["semesters"]);
        toast({
          title: "Success!",
          description:
            "A new semester has been created. Add batches from the semesters menu.",
        });
        form.reset({
          year: new Date().getFullYear(),
          half: 1,
        });
      },
    },
  );

  const form = useForm({
    resolver: zodResolver(
      z.object({
        year: z.coerce
          .number({ required_error: "Please enter a name for the department." })
          .min(new Date().getFullYear(), {
            message: "Semester year can't be less than current year.",
          }),
        half: z.coerce
          .number({
            required_error: "Please which half of the year it is.",
          })
          .min(1, "Semester half can't be less than 0")
          .max(3, "Semester half can't be more than 3"),
      }),
    ),
    defaultValues: {
      year: new Date().getFullYear(),
      half: 1,
    },
  });
  function onSubmit(data) {
    createSemester({ ...data, department: user.department[0] });
    setOpen(false);
  }
  if (isGettingSemester || isCreatingSemester)
    return <Loader2 className="animate-spin" />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading as="h1">Semesters</Heading>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className={buttonVariants({ variant: "default" })}>
            <Plus className="mr-2 h-4 w-4" /> Create Semester
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Semester</DialogTitle>
              <DialogDescription>
                This creates a new semester in visualize.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid w-full items-center gap-2">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter semester year"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="half"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Half</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter semester half"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="w-full" type="submit">
                    <MagicWandIcon className="mr-2 h-4 w-4" /> Create
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6 grid grid-cols-9 gap-4 ">
        {semesters?.map((semester) => {
          return (
            <div
              key={semester._id}
              className="col-span-3 flex items-center justify-between rounded-lg border p-6 hover:bg-accent"
            >
              <div className="">
                <span className="text-xl font-semibold">
                  Semester {semester.half}
                </span>
                <div className="mt-2">{semester.year}</div>
              </div>
              <NavLink
                to={`/admin/semesters/edit?semesterId=${semester._id}`}
                className="hover:underline"
              >
                Edit
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SemestersLayout;
