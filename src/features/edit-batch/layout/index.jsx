import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { SERVER_URL } from "../../../data/globals";
import Heading from "../../../components/Heading";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
const thisYear = new Date().getFullYear();

const formSchema = z.object({
  year: z.coerce.number().min(thisYear, {
    message: `Batch year can't be less than this year (${thisYear})`,
  }),
  sectionNumber: z.coerce
    .number()
    .min(1, { message: "Number of sections can't be less than 1" }),
});

function EditBatchLayout() {
  const [repInput, setRepInput] = useState([]);
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get("batchId");

  const { data: batchData } = useQuery({
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/batches/${batchId}`,
        method: "get",
      }),
    queryKey: ["batches", batchId],
  });

  const batch = batchData?.data?.data;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: thisYear,
      sectionNumber: 1,
    },
  });

  const { user } = useUser();

  function onSubmit(values) {
    const fields = { ...values, sections, department: user.department };
    delete fields.sectionNumber;
  }
  const [sections, setSections] = useState([]);

  useEffect(() => {
    form.reset({ year: batch?.year, sectionNumber: batch?.sections?.length });
  }, [batch?.sections?.length, batch?.year, form]);

  useEffect(() => {
    setSections(() => {
      return batch?.sections;
    });
  }, [batch?.sections]);

  const { toast } = useToast();
  const { mutate: addRep } = useMutation({
    mutationFn: ([uniId, sectId]) =>
      axios({
        url: `${SERVER_URL}/users/assignRep`,
        data: { uniId, sectId },
        method: "patch",
      }),
    onSuccess: () => {
      toast({
        title: "Representative assigned!",
      });
    },
  });

  function handleAssignRep(sectIndex, sectId) {
    addRep([repInput[sectIndex], sectId]);
  }

  return (
    <div>
      <div>
        <div className="grid grid-cols-9 gap-4">
          <div className="sticky top-20 col-span-3 h-fit">
            <div className="mb-4 flex items-center justify-between">
              <Heading as="h1">Batches</Heading>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year (Ex: 2024)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter batch year"
                          type="number"
                          pattern="[0-9]{4}"
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormDescription>
                        This is the batchs&apos; registered year.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sectionNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sections</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter number of sections"
                          type="number"
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormDescription>
                        These are sections included in this batch.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <Button>
                  <Save className="mr-2 h-4 w-4" type="submit" /> Save changes
                </Button> */}
              </form>
            </Form>
          </div>
          <div className="col-span-6">
            <Table>
              <TableCaption>A list of generated sections.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Section name</TableHead>
                  <TableHead className="text-right">Assign ID</TableHead>
                  <TableHead className="text-right">Save</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sections?.map((section, i) => (
                  <TableRow key={section.name}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell className="font-medium">
                      {section.year}
                    </TableCell>
                    <TableCell>{section.name}</TableCell>

                    <TableCell className="text-right">
                      <Input
                        className="ml-auto h-8 max-w-[240px]"
                        placeholder={`${section.name} representative ID`}
                        value={repInput.at(i)}
                        onChange={(e) =>
                          setRepInput((prev) => {
                            const newReps = [...prev];
                            newReps[i] = e.target.value;
                            return newReps;
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex">
                        <Button
                          disabled={!repInput[i]}
                          onClick={() => handleAssignRep(i, section._id)}
                          variant="secondary"
                          size="sm"
                          className="ml-auto"
                        >
                          Save
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBatchLayout;
