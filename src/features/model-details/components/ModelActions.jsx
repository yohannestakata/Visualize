import { Button } from "@/components/ui/button";
import { Edit2, Eye, EyeOffIcon } from "lucide-react";

import useUpdateModel from "../../../hooks/useUpdateModel";
import { useNavigate } from "react-router-dom";

function ModelActions({ id, model }) {
  const { mutate: updateModel, isPending: isUpdatingModel } =
    useUpdateModel(id);
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        className="flex items-center"
        onPointerDown={() =>
          navigate(`/teacher/add-model-definitions?modelId=${id}`)
        }
      >
        <Edit2 className="mr-2 h-4 w-4" />
        <span>Edit definitions</span>
      </Button>
      <Button
        size="sm"
        variant={`${model?.drafted ? "" : "outline"}`}
        onPointerDown={(e) => {
          e.preventDefault();
          updateModel({ drafted: !model?.drafted });
        }}
        disabled={isUpdatingModel}
      >
        {model?.drafted ? (
          <div className="flex items-center justify-between">
            <Eye className="mr-2 h-4 w-4" />
            <span>Publish</span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <EyeOffIcon className="mr-2 h-4 w-4" />
            <span>Unpublish</span>
          </div>
        )}
      </Button>
    </div>
  );
}

export default ModelActions;
