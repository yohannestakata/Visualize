import { useSearchParams } from "react-router-dom";
import useGetModel from "../../../hooks/useGetModel";

function TakeTestLayout() {
  const [searchParams] = useSearchParams();
  const modelId = searchParams.get("modelId");
  const { data: model } = useGetModel(modelId);
  console.log(model);
  return <div className="mt-6 flex-1">Take test</div>;
}

export default TakeTestLayout;
