import { NavLink } from "react-router-dom";
import Heading from "../../../components/Heading";
import { UserPlus2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";

function BatchesLayout() {
  const { data } = useQuery({
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/batches`,
        method: "get",
      }),
    queryKey: ["batches"],
  });

  const batches = data?.data?.data;

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading>Batches</Heading>
        <NavLink
          className={buttonVariants({ variant: "default" }) + " bg-background"}
          to={"/admin/add-batches"}
        >
          <UserPlus2 className="mr-2 h-4 w-4" />
          <span>Add Batches</span>
        </NavLink>
      </div>
      <div className="mt-6 grid grid-cols-9 gap-4">
        {batches?.map((batch) => {
          return (
            <div
              key={batch._id}
              className="col-span-3 space-y-2 rounded-lg border p-3"
            >
              <span className="text-2xl font-semibold">{batch.year}</span>

              <div className="flex items-center justify-between">
                {batch.sections.map((section) => section.name).join(", ")}
                <NavLink to={`/admin/edit-batch?batchId=${batch._id}`}>
                  Edit
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BatchesLayout;
