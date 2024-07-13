import ModelsList from "../components/ModelsList";
import Heading from "../../../components/Heading";

import { useState } from "react";
import { CircleAlert, Loader2 } from "lucide-react";
import ListFilter from "../components/ListFilter";
import useGetModels from "../../../hooks/useGetModels";
import useUser from "../../../hooks/useUser";

function UploadedModels() {
  const { user } = useUser();
  const { data, isPending } = useGetModels({ teacherId: user._id });
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
        {filteredModels?.length ? (
          <ModelsList models={filteredModels} />
        ) : (
          <div className="col-span-12 flex items-center justify-center gap-2">
            <CircleAlert className="h-4 w-4" />
            <span>Your prepared models will show up here.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadedModels;
