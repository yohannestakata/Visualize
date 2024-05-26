import ModelsList from "../components/ModelsList";
import { Separator } from "@/components/ui/separator";
import Heading from "../../../components/Heading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetModels from "../hooks/useGetModels";
import { useState } from "react";
import { Loader2 } from "lucide-react";

function UploadedModels() {
  const { data, isPending } = useGetModels();
  const models = data?.data;

  const [filterBy, setFilterBy] = useState("all");

  const filteredModels = models?.filter((model) => {
    if (filterBy === "all") return true;
    return model.department === filterBy;
  });

  if (isPending)
    return <Loader2 className="mx-auto mt-4 h-10 w-10 animate-spin" />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading as="h1">My Models</Heading>
        <Select onValueChange={(value) => setFilterBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Departments</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="computer science">Computer Science</SelectItem>
              <SelectItem value="architecture">Architecture</SelectItem>
              <SelectItem value="accounting">Accounting</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="mt-3" />
      <ModelsList models={filteredModels} />
    </div>
  );
}

export default UploadedModels;
