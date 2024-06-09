import { useSearchParams } from "react-router-dom";
import useGetModel from "../../../hooks/useGetModel";
import Model from "../../../components/Model";
import { Suspense } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Heading from "../../../components/Heading";
import { Loader2 } from "lucide-react";

function LearnModelLayout() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("modelId");
  const { data: model, isLoading: isModelLoading } = useGetModel(id);
  console.log(model);
  return (
    <div className="mt-6">
      <Heading as={"h1"}>{model?.modelTitle}</Heading>
      <ResizablePanelGroup
        direction="horizontal"
        className="mt-4 min-h-96 rounded-lg border"
      >
        <ResizablePanel defaultSize={66}>
          <div className="aspect-photo bg-secondary">
            <Suspense fallback={<Loader2 className="animate-spin" />}>
              {!isModelLoading && <Model modelUrl={model?.modelUrl} />}
            </Suspense>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={33}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default LearnModelLayout;
