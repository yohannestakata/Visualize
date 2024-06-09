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
  const { data: model, isLoading: isGettingModel } = useGetModel(id);

  console.log(model, isGettingModel);

  if (isGettingModel) return <Loader2 />;

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-4 col-end-10 rounded-lg">
        <div className="flex items-center justify-between">
          <Heading as={"h1"}>Model Details</Heading>
          {!isGettingModel && <ModelActions id={id} model={model} />}
        </div>
        {!isGettingModel && (
          <div className="mt-4 flex flex-col">
            <UpdateModelForm model={model} id={id} />
            <Separator className="mt-6" />
            <DangerArea modelName={model?.modelTitle} id={id} />
          </div>
        )}
        {isGettingModel && (
          <div className="mt-4 flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading model...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModelDetailsLayout;
