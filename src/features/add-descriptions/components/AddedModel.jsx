import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import Model from "../../../components/Model";

function AddedModel({ data, handleOnClick, clickedMesh, onPointerMissed }) {
  return (
    <div className="aspect-video overflow-hidden rounded-lg border">
      <Suspense
        fallback={<Loader2 className="mx-auto my-auto h-full animate-spin" />}
      >
        {data?.modelUrl && (
          <Model
            modelUrl={data?.modelUrl}
            onClick={handleOnClick}
            clickedMesh={clickedMesh}
            onPointerMissed={onPointerMissed}
          />
        )}
      </Suspense>
    </div>
  );
}

export default AddedModel;
