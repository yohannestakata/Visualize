import { NavLink, useSearchParams } from "react-router-dom";
import useGetModel from "../../../hooks/useGetModel";
import Model from "../../../components/Model";
import { Suspense, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Heading from "../../../components/Heading";
import { Download, Loader2, PencilLine, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";

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

  const [assistantInput, setAssistantInput] = useState("");
  const [assistantReplies, setAssistantReplies] = useState([]);

  const { mutate: askAssistant } = useMutation({
    mutationFn: () =>
      axios({
        url: `${SERVER_URL}/assistant`,
        method: "post",
        data: { message: assistantInput },
      }),
    onSuccess: (data) => {
      setAssistantReplies((prev) => [...prev, data.data.text]);
      setAssistantInput("");
    },
  });

  const handleAssistantClick = () => askAssistant();

  return (
    <div className="mt-6 flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Heading as={"h1"}>Chapter: {model?.modelTitle}</Heading>
        <div className="flex items-center gap-2">
          <a
            href={model?.modelUrl}
            className={buttonVariants({ variant: "secondary" })}
          >
            <Download className="mr-2 h-4 w-4" />
            Download model
          </a>
          <NavLink to={`/learn/take-test?modelId=${model?._id}`}>
            <Button className="flex items-center gap-2">
              <PencilLine className=" h-4 w-4" /> Take test
            </Button>
          </NavLink>
        </div>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="mt-5 h-full min-h-96 flex-1 rounded-lg "
      >
        <ResizablePanel defaultSize={50}>
          <div className="aspect-square overflow-hidden rounded-lg pr-3">
            <div className="h-full w-full rounded-lg bg-secondary">
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
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} className="pl-3">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>
              <div className="p-6 pl-0 pt-0">
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
              <div className="flex h-full flex-col gap-3 p-6 pb-0 pl-0">
                <Heading as="h2">Assistant</Heading>
                <ScrollArea className="flex h-full flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    {assistantReplies.map((reply) => (
                      <p
                        key={reply}
                        className="rounded-3xl rounded-br-none bg-accent p-3"
                      >
                        {reply}
                      </p>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Message assistant"
                    rows={1}
                    className="min-h-0 items-end justify-end"
                    value={assistantInput}
                    onChange={(e) => setAssistantInput(e.target.value)}
                  />
                  <Button
                    variant="secondary"
                    onMouseDown={handleAssistantClick}
                  >
                    Send
                  </Button>
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
