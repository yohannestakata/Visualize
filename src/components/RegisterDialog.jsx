import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { EnterIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../data/globals";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Save } from "lucide-react";
import useUser from "../hooks/useUser";
import { useToast } from "@/components/ui/use-toast";

function RegisterDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { data: semestersData } = useQuery({
    queryKey: ["semesters"],
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/semesters`,
        method: "get",
      }),
  });
  const semesters = semestersData?.data?.data;

  const [inputs, setInputs] = useState({
    semester: "",
    batch: "",
    sections: "",
    courses: [],
  });

  const selectedSemester = semesters?.find(
    (semester) => semester._id === inputs.semester,
  );

  const selectedBatch = selectedSemester?.batches?.find(
    (batch) => batch._id === inputs.batch,
  );

  function handleCheckedChange(checked, value) {
    if (checked)
      setInputs((prev) => ({ ...prev, courses: [...prev.courses, value] }));
    else
      setInputs((prev) => ({
        ...prev,
        courses: [...prev.courses].filter((course) => course !== value),
      }));
  }

  const { user } = useUser();

  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: (fields) =>
      axios({
        url: `${SERVER_URL}/users/register/${user._id}`,
        data: fields,
        method: "patch",
      }),

    onSuccess: () => {
      setOpen(false);
      toast({
        title: "Successfully registered for courses!",
        description: "You can now access new classrooms.",
      });
    },
  });

  function handleSubmit() {
    console.log({ ...inputs, user: user._id });
    register(inputs);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="">
          <EnterIcon className="mr-2 h-4 w-4" /> Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Register for a course here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Semesters
            </Label>
            <Select
              id="name"
              onValueChange={(value) =>
                setInputs((prev) => ({ ...prev, semester: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Years</SelectLabel>

                  {semesters?.map((semester) => (
                    <SelectItem key={semester._id} value={semester?._id}>
                      {semester.year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Batches
            </Label>
            <Select
              id="name"
              disabled={!inputs.semester}
              onValueChange={(value) =>
                setInputs((prev) => ({ ...prev, batch: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>

                  {selectedSemester?.batches.map((batch) => (
                    <SelectItem key={batch._id} value={batch._id}>
                      {batch.year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Sections
            </Label>
            <Select
              id="name"
              disabled={!inputs.batch}
              onValueChange={(value) =>
                setInputs((prev) => ({ ...prev, sections: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  {selectedBatch?.sections?.map((section) => (
                    <SelectItem value={section._id} key={section._id}>
                      {section.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-right text-sm">Courses</div>
            <div className="col-span-3 flex flex-col gap-4">
              {selectedSemester &&
                selectedBatch?.courses?.map((course) => (
                  <div className="flex items-center gap-2" key={course._id}>
                    <Checkbox
                      id={course._id}
                      value={course._id}
                      onCheckedChange={(checked) =>
                        handleCheckedChange(checked, course._id)
                      }
                    />
                    <label
                      htmlFor={course._id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {course.name}
                    </label>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isRegistering}>
            <Save className="mr-2 h-4 w-4" /> Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterDialog;
