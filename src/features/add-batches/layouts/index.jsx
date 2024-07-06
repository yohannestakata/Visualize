import { Save } from "lucide-react";
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
import useCreateBatch from "../hooks/useCreateBatch";
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

function AddBatchesLayout() {
  const { mutate, isPending } = useCreateBatch();

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

    mutate(fields);
  }

  const [sections, setSections] = useState([]);

  const sectionNumber = form.watch("sectionNumber");
  const year = form.watch("year");

  useEffect(() => {
    setSections(() => {
      return [...Array(Number(sectionNumber)).keys()].map((num) => ({
        name: `N${num + 1}`,
        representative: "",
        year,
      }));
    });
  }, [sectionNumber, year]);

  return (
    <div>
      <div className="grid grid-cols-9 gap-4">
        <div className="sticky top-20 col-span-3 h-fit">
          <div className="mb-4 flex items-center justify-between">
            <Heading as="h1">Batches</Heading>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      />
                    </FormControl>
                    <FormDescription>
                      These are sections included in this batch.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending}>
                <Save className="mr-2 h-4 w-4" type="submit" /> Save changes
              </Button>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {sections.map((section, i) => (
                <TableRow key={section.name}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">{section.year}</TableCell>
                  <TableCell>{section.name}</TableCell>
                  <TableCell className="text-right">
                    <Input
                      className="ml-auto h-8 max-w-[240px]"
                      placeholder={`${section.name} representative ID`}
                      value={sections.at(i).representative}
                      onChange={(e) =>
                        setSections((prev) => {
                          const newSects = [...prev];
                          newSects[i].representative = e.target.value;
                          return newSects;
                        })
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AddBatchesLayout;
