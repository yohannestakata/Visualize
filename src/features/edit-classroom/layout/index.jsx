import Heading from "../../../components/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown, Plus, Save, Trash2 } from "lucide-react";
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
import { useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import useUser from "../../../hooks/useUser";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function EditClassroomLayout() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [modelValue, setModelValue] = useState("");
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const classroomId = searchParams.get("classroomId");
  console.log(classroomId);

  const { data: classroomData } = useQuery({
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/classrooms/${classroomId}`,
        method: "get",
      }),
    queryKey: ["classroom", classroomId],
  });

  const classroom = classroomData?.data?.data;

  useEffect(() => {
    setInputs(classroom);
  }, [classroom]);

  const [inputs, setInputs] = useState({
    name: "",
    models: [],
    sections: user?.sections,
    teacher: user?._id,
  });

  function handleAddModel() {
    setInputs((prev) => ({
      ...prev,
      models: [...new Set([...prev.models, modelValue])],
    }));
    setModelValue();
  }

  const { data: modelsData } = useQuery({
    queryKey: ["models"],
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/models`,
        method: "get",
      }),
  });

  const models = modelsData?.data?.data;

  function handleDeleteModel(id) {
    setInputs((prev) => ({
      ...prev,
      models: [...prev.models].filter((model) => model !== id),
    }));
  }

  const hasAllValues = () => {
    const requiredProperties = ["department", "course", "name", "models"];
    return requiredProperties.every((prop) => inputs[prop].length !== 0);
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: updateClassroom } = useMutation({
    mutationFn: (fields) =>
      axios({
        url: `${SERVER_URL}/classrooms/${classroomId}`,
        method: "post",
        data: fields,
      }),

    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Classroom updated!",
        description: "Add test to complete configuration.",
      });
      navigate(`/teacher/classrooms`);
      queryClient.invalidateQueries(["classrooms"]);
    },
  });

  function handleCreateClassroom() {
    if (hasAllValues()) updateClassroom(inputs);
  }

  console.log(inputs);

  return (
    <div>
      <div className="mt-4 grid grid-cols-9 gap-4">
        <div className="col-span-3">
          <div className="sticky top-20  flex flex-col gap-6">
            <Heading>Edit Classroom</Heading>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={inputs?.name}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="sections">Models</Label>
              <div className="flex gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {modelValue
                        ? models.find((models) => models._id === modelValue)
                            ?.modelTitle
                        : "Select model..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search model..." />
                      <CommandEmpty>No model found.</CommandEmpty>
                      <CommandList>
                        {models?.map((model) => (
                          <CommandItem
                            key={model._id}
                            value={model._id}
                            onSelect={(currentValue) => {
                              setModelValue(
                                currentValue === modelValue ? "" : currentValue,
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={`
                            mr-2 h-4 w-4 
                           ${
                             modelValue === model._id
                               ? "opacity-100"
                               : "opacity-0"
                           }
                          `}
                            />
                            {model?.modelTitle}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Button
                  variant="secondary"
                  onMouseDown={handleAddModel}
                  disabled={!modelValue}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
            <Button onClick={handleCreateClassroom}>
              <Save className="mr-2 h-4 w-4" /> Save changes
            </Button>
          </div>
        </div>
        <div className="col-span-6 ">
          <h2 className="text-xl font-semibold">Added models</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {models
              ?.filter((model) => {
                if (inputs.models.find((modelId) => modelId === model._id))
                  return true;
              })
              .map((model) => {
                return (
                  <div
                    key={model._id}
                    className="rounded-lg border bg-card p-3 text-card-foreground hover:bg-accent"
                  >
                    <div className="aspect-photo overflow-hidden rounded-lg  ">
                      <img
                        src={model.thumbnailUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-2  flex items-center justify-between font-semibold">
                      <span>{model.modelTitle}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-destructive"
                        onClick={() => handleDeleteModel(model._id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditClassroomLayout;
