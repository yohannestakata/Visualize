import { useSearchParams } from "react-router-dom";
import useGetModel from "../../../hooks/useGetModel";
import Model from "../../../components/Model";
import { Suspense, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Heading from "../../../components/Heading";
import { ListChecks, Loader2, PencilLine, Timer } from "lucide-react";

function TakeTestLayout() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("modelId");
  const { data: model, isLoading: isModelLoading } = useGetModel(id);
  const [clickedMesh, setClickedMesh] = useState("");
  const [meshIndex, setMeshIndex] = useState(0);
  const [meshes, setMeshes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  useEffect(() => {
    console.log(clickedMesh);
    setClickedMesh(meshes?.[meshIndex]);
  }, [clickedMesh, meshIndex, meshes]);

  return (
    <div className="mt-6 flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Heading as={"h1"} className={"flex items-center gap-3"}>
          <PencilLine /> Name all the parts: {model?.modelTitle}
        </Heading>
        <Button className="flex items-center gap-2">
          <Timer className=" h-4 w-4" /> Start test
        </Button>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="mt-5 h-full min-h-96 flex-1 rounded-lg "
      >
        <ResizablePanel defaultSize={50}>
          <div className="aspect-square h-full bg-secondary">
            <Suspense fallback={<Loader2 className="animate-spin" />}>
              {!isModelLoading && (
                <Model
                  modelUrl={model?.modelUrl}
                  clickedMesh={clickedMesh}
                  showHelper={false}
                  setMeshes={setMeshes}
                />
              )}
            </Suspense>
          </div>
        </ResizablePanel>
        <ResizableHandle />

        <ResizablePanel defaultSize={50}>
          <div className="p-6 pt-0">
            <Heading as={"h2"} className={"flex items-center gap-2"}>
              <ListChecks />
              {`Your answers (0/${meshes?.length})`}
            </Heading>
            <ScrollArea className="h-full w-full ">
              <p className="mt-2 break-all pb-2">e</p>
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Instructions</DialogTitle>
            <DialogDescription>
              Make sure to understand the following before starting the test.
            </DialogDescription>
          </DialogHeader>
          <ul className="flex list-outside list-disc flex-col gap-2">
            <li>
              Your task is to accurately name the part of the model (
              {`${model?.modelTitle}`}) that is highlighted.
            </li>
            <li>
              The model contains{" "}
              <span className="font-semibold"> {`${meshes?.length}`}</span>{" "}
              parts in total.
            </li>
            <li>
              Time given to complete the test is{" "}
              <span className="font-semibold">
                {`${String(Math.floor((meshes?.length * 10) / 60)).length < 2 ? "0" + Math.floor((meshes?.length * 10) / 60) : Math.floor((meshes?.length * 10) / 60)}:${String((meshes?.length * 10) % 60).length < 2 ? "0" + ((meshes?.length * 10) % 60) : (meshes?.length * 10) % 60}`}
              </span>
              .
            </li>
          </ul>
          <DialogFooter>
            <span>Good Luck!</span>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TakeTestLayout;
