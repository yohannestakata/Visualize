import Heading from "../../../components/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
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
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

function CreateClassroomLayout() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  console.log(value, "ew");
  return (
    <div>
      <Heading>Create Classroom</Heading>
      <div className="mt-4 grid grid-cols-9 gap-4">
        <div className="col-span-3 flex flex-col gap-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Enter name" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="sections">Sections</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
                    : "Select framework..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandList>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={`
                            mr-2 h-4 w-4 
                           ${
                             value === framework.value
                               ? "opacity-100"
                               : "opacity-0"
                           }
                          `}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="models">Models</Label>
            <Input id="models" type="text" placeholder="Enter name" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="course">Course</Label>
            <Input id="course" type="text" placeholder="Enter name" />
          </div>
        </div>
        <div className="col-span-6 grid grid-cols-3 gap-4">
          <div className="aspect-photo bg-black"></div>
          <div className="aspect-photo bg-black"></div>
          <div className="aspect-photo bg-black"></div>
        </div>
      </div>
    </div>
  );
}

export default CreateClassroomLayout;
