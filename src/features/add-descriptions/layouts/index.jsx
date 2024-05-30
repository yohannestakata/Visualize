import Heading from "../../../components/Heading";
import { Separator } from "@/components/ui/separator";
import useGetModel from "../../../hooks/useGetModel";
import { useSearchParams } from "react-router-dom";

import Model from "../../../components/Model";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

function AddModelDescriptionsLayout() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("modelId");
  const { data, isPending } = useGetModel(id);
  console.log(data);

  if (isPending) return "Loading model...";
  return (
    <div>
      <div>
        <Heading as="h1">Add Model Definitions</Heading>
        <Separator className="mt-3" />
      </div>
      <div className="mt-6 grid grid-cols-12 gap-4">
        <div className="col-span-6 flex flex-col gap-4 ">
          <div className="aspect-video overflow-hidden rounded-lg border">
            <Suspense
              fallback={
                <Loader2 className="mx-auto my-auto h-full animate-spin" />
              }
            >
              {data?.modelUrl && (
                <Model
                  modelUrl={data?.modelUrl}
                  // onClick={onClickedMesh}
                  // onPointerMissed={onPointerMissed}
                  // clickedMesh={clickedMesh}
                />
              )}
            </Suspense>
          </div>
          <div>Input for description adding </div>
        </div>
        <div className="col-span-6">
          <Heading as={"h2"}>Added definitions</Heading>
          All definitions here
        </div>
      </div>
    </div>
  );
}

export default AddModelDescriptionsLayout;
