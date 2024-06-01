import ModelsList from "../components/ModelsList";
import { Separator } from "@/components/ui/separator";
import Heading from "../../../components/Heading";

import useGetModels from "../hooks/useGetModels";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import ListFilter from "../components/ListFilter";

function UploadedModels() {
  const { data, isPending } = useGetModels();
  const models = data?.data;

  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredModels = models
    ?.filter((model) => {
      if (departmentFilter === "all") return true;
      return model.department === departmentFilter;
    })
    ?.filter((model) => {
      if (statusFilter === "all") return true;
      return model.drafted === (statusFilter === "drafted");
    });

  if (isPending)
    return <Loader2 className="mx-auto mt-10 h-10 w-10 animate-spin" />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading as="h1">My Models</Heading>
        <ListFilter
          setStatusFilter={setStatusFilter}
          setDepartmentFilter={setDepartmentFilter}
        />
      </div>
      <div className="mt-5 grid grid-cols-12 gap-4">
        <ModelsList models={filteredModels} />
      </div>
    </div>
  );
}

export default UploadedModels;
