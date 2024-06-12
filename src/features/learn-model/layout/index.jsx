import { useSearchParams } from "react-router-dom";
import useGetModel from "../../../hooks/useGetModel";
import Model from "../../../components/Model";
import { Suspense, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Heading from "../../../components/Heading";
import { Loader2, Volume2 } from "lucide-react";

function LearnModelLayout() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("modelId");
  const { data: model, isLoading: isModelLoading } = useGetModel(id);
  const [clickedMesh, setClickedMesh] = useState("");

  function handleOnClick(e) {
    e.stopPropagation();
    setClickedMesh(e.object);
  }

  function onPointerMissed(e) {
    e.stopPropagation();
    setClickedMesh("");
  }

  function speak(text) {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0;
    utterance.voice = voices[2];
    synth.speak(utterance);
  }

  return (
    <div className="mt-6 ">
      <Heading as={"h1"}>{model?.modelTitle}</Heading>
      <ResizablePanelGroup
        direction="horizontal"
        className="mt-4 min-h-96 rounded-lg border"
      >
        <ResizablePanel defaultSize={30}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Three</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40}>
          <div className="aspect-square h-full bg-secondary">
            <Suspense fallback={<Loader2 className="animate-spin" />}>
              {!isModelLoading && (
                <Model
                  modelUrl={model?.modelUrl}
                  clickedMesh={clickedMesh}
                  onClick={handleOnClick}
                  onPointerMissed={onPointerMissed}
                />
              )}
            </Suspense>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={30}>
          <div className="h-full p-6">
            <Heading as={"h2"} className={"flex items-center gap-2"}>
              <span>{clickedMesh.name || "Nothing selected"}</span>
              <Volume2
                onMouseDown={() => speak(clickedMesh.name)}
                className="cursor-pointer"
              />
            </Heading>
            <ScrollArea className="h-full w-full ">
              <p className="mt-2 break-all pb-2">
                {
                  model?.definitions.find(
                    (def) => def.title === clickedMesh.name,
                  )?.definition
                }
              </p>
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default LearnModelLayout;
