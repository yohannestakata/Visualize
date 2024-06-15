import { NavLink, useSearchParams } from "react-router-dom";
import useGetModel from "../../../hooks/useGetModel";
import Model from "../../../components/Model";
import { Suspense, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Heading from "../../../components/Heading";
import { Loader2, PencilLine, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="mt-6 flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Heading as={"h1"}>Chapter: {model?.modelTitle}</Heading>
        <NavLink to={`/learn/take-test?modelId=${model?._id}`}>
          <Button className="flex items-center gap-2">
            <PencilLine className=" h-4 w-4" /> Take test
          </Button>
        </NavLink>
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
                  onClick={handleOnClick}
                  onPointerMissed={onPointerMissed}
                />
              )}
            </Suspense>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>
              <div className="p-6 pt-0">
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
            <ResizableHandle />
            <ResizablePanel>
              <div className="flex h-full flex-col gap-3 p-6 pb-0">
                <Heading as="h2">Assistant</Heading>
                <ScrollArea className="h-full flex-1">
                  <p></p>
                </ScrollArea>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Message assistant"
                    rows={1}
                    className="min-h-0 items-end justify-end"
                  />
                  <Button variant="secondary">Send</Button>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default LearnModelLayout;
