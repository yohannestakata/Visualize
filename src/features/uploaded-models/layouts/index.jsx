import ModelsList from "../components/ModelsList";
import { Separator } from "@/components/ui/separator";
import Heading from "../../../components/Heading";

import useGetModels from "../hooks/useGetModels";
import { useState } from "react";
import { ListFilterIcon, Loader2 } from "lucide-react";
import ListFilter from "../components/ListFilter";

function UploadedModels() {
  const { data, isPending } = useGetModels();
  const models = data?.data;

  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const filteredModels = models
    ?.filter((model) => {
      if (departmentFilter === "all") return true;
      return model.department === departmentFilter;
    })
    ?.filter((model) => {
      if (availabilityFilter === "all") return true;
      return model.drafted === (availabilityFilter === "drafted");
    });

  if (isPending)
    return <Loader2 className="mx-auto mt-10 h-10 w-10 animate-spin" />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading as="h1">My Models</Heading>
        <ListFilter
          setAvailabilityFilter={setAvailabilityFilter}
          setDepartmentFilter={setDepartmentFilter}
        />
      </div>
      <Separator className="mt-3" />
      <ModelsList models={filteredModels} />
    </div>
  );
}

export default UploadedModels;
