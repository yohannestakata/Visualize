import { useSearchParams } from "react-router-dom";
import useGetModel from "../../../hooks/useGetModel";
import Heading from "../../../components/Heading";

import UpdateModelForm from "../components/UpdateModelForm";
import { Loader2 } from "lucide-react";
import ModelActions from "../components/ModelActions";
import { Separator } from "@/components/ui/separator";

import DangerArea from "../components/DangerArea";

function ModelDetailsLayout() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("model-id");
  const { data: model, isPending: isGettingModel } = useGetModel(id);

  if (isGettingModel) return <Loader2 />;

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-4 col-end-10 rounded-lg">
        <div className="flex items-center justify-between">
          <Heading as={"h1"}>Model Details</Heading>
          <ModelActions id={id} model={model} />
        </div>
        <div className="mt-4 flex flex-col">
          <UpdateModelForm model={model} id={id} />
          <Separator className="mt-6" />
          <DangerArea modelName={model?.modelTitle} />
        </div>
      </div>
    </div>
  );
}

export default ModelDetailsLayout;
