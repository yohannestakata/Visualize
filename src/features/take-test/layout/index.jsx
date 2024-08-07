import { useSearchParams } from "react-router-dom";
import useGetModel from "../../../hooks/useGetModel";
import Model from "../../../components/Model";
import { Suspense, useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
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
import {
  Check,
  Lightbulb,
  LightbulbOff,
  ListChecks,
  Loader2,
  PencilLine,
  RefreshCcw,
  Send,
  Timer,
  X,
} from "lucide-react";

function getTimeLeft(timeLeft) {
  const SECONDS = 60;
  return `${String(Math.floor(timeLeft / SECONDS)).length < 2 ? "0" + Math.floor(timeLeft / SECONDS) : Math.floor(timeLeft / SECONDS)}:${String(timeLeft % SECONDS).length < 2 ? "0" + (timeLeft % SECONDS) : timeLeft % SECONDS}`;
}

function TakeTestLayout() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("modelId");
  const { data: model, isLoading: isModelLoading } = useGetModel(id);
  const [clickedMesh, setClickedMesh] = useState("");
  const [meshIndex, setMeshIndex] = useState(0);
  const [meshes, setMeshes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startedTest, setStartedTest] = useState(false);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState([]);
  const inputRef = useRef(null);
  const [hintCounter, setHintCounter] = useState(3);

  const SECONDS_PER_MESH = 15;
  let finishedExam = answers.length === meshes?.length - 1;

  const correctAnswers = answers.reduce((acc, curr) => {
    if (curr.givenAnswer.toLowerCase() === curr.correctAnswer.toLowerCase())
      return acc + 1;
    else return acc;
  }, 0);

  console.log(clickedMesh);
  function handleSubmit(e) {
    if (e?.preventDefault) e.preventDefault();
    setAnswers((prev) => [
      { correctAnswer: clickedMesh.name, givenAnswer: input },
      ...prev,
    ]);
    setInput("");
    setMeshIndex((prev) => prev + 1);
  }

  function handleStartTest() {
    setStartedTest(true);
    inputRef.current.disabled = false;
    inputRef.current.focus();
  }

  function handleRestart() {
    setStartedTest(false);
    inputRef.current.disabled = true;
    setAnswers([]);
    setInput("");
    finishedExam = false;
    setTimeLeft(meshes?.length * SECONDS_PER_MESH);
    setMeshIndex(0);
    setHintCounter(3);
  }

  function handleClickHint(e) {
    e.preventDefault();
    if (hintCounter > 0) {
      setHintCounter((prev) => prev - 1);
      setInput(clickedMesh?.name.slice(0, 4));
    }
  }

  useEffect(() => {
    console.log(meshes?.[meshIndex + 1]);
    if (meshes?.[meshIndex + 1]) setClickedMesh(meshes?.[meshIndex + 1][1]);
  }, [meshIndex, meshes]);

  useEffect(() => {
    if (meshes) setTimeLeft(meshes?.length * SECONDS_PER_MESH);
  }, [meshes]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (getTimeLeft(timeLeft) === "00:00" || finishedExam) {
        clearInterval(interval);
        return;
      }
      if (startedTest) setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [startedTest, timeLeft, finishedExam]);

  return (
    <div className="mt-6 flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Heading as={"h1"} className={"flex items-center gap-3"}>
          <PencilLine /> Name all the parts: {model?.modelTitle}
        </Heading>
        <div className="items- flex gap-2">
          {startedTest && (
            <>
              <div className="relative">
                <Button
                  variant="outline"
                  onMouseDown={handleClickHint}
                  className="aspect-square p-0"
                  disabled={hintCounter === 0}
                >
                  {hintCounter === 0 ? (
                    <LightbulbOff className="h-4 w-4" />
                  ) : (
                    <Lightbulb className="h-4 w-4" />
                  )}
                </Button>
                <div
                  className={`absolute bottom-1/2 left-0 flex aspect-square h-4 w-4 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full text-sm leading-none  ${hintCounter === 0 ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"}`}
                >
                  {hintCounter}
                </div>
              </div>

              <Button variant="secondary" onClick={handleRestart}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Restart
              </Button>
            </>
          )}
          {!startedTest && (
            <Button
              className="flex items-center gap-2"
              variant={startedTest ? "secondary" : ""}
              onClick={handleStartTest}
            >
              <span className="flex items-center gap-2">
                <Timer className=" h-4 w-4" /> Start test
              </span>
            </Button>
          )}
          {finishedExam && (
            <Button>
              <Send className="mr-2 h-4 w-4" /> Submit results
            </Button>
          )}
        </div>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="mt-5 h-full min-h-96 flex-1 rounded-lg "
      >
        <ResizablePanel defaultSize={50}>
          <div className="aspect-square pr-3">
            <div className="h-full w-full rounded-lg border bg-muted">
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
          </div>
        </ResizablePanel>
        <ResizableHandle />

        <ResizablePanel defaultSize={50}>
          <div className="flex aspect-square flex-col pl-3">
            <div className="flex max-h-full flex-1 flex-col gap-4 rounded-lg border p-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter part name"
                  disabled={
                    !startedTest ||
                    getTimeLeft(timeLeft) === "00:00" ||
                    finishedExam
                  }
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                />
                <Button
                  disabled={
                    !startedTest ||
                    getTimeLeft(timeLeft) === "00:00" ||
                    finishedExam
                  }
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Heading as={"h2"} className={"flex items-center gap-2"}>
                  <ListChecks />
                  {`Your answers (${answers.length}/${meshes?.length - 1})`}
                  {finishedExam && (
                    <div>
                      {" "}
                      | Score:&nbsp;
                      <span className="font-semibold text-primary">
                        {Math.round((correctAnswers / meshes.length) * 100)}%
                      </span>
                    </div>
                  )}
                </Heading>
                <span>
                  {getTimeLeft(timeLeft) !== "00:00" ? (
                    getTimeLeft(timeLeft)
                  ) : (
                    <span className="flex items-center font-semibold text-destructive">
                      <Timer className="mr-2 h-4 w-4 " /> Time&apos;s up!
                    </span>
                  )}
                </span>
              </div>
              <ScrollArea className="flex-1">
                <div className="break-all">
                  <div className="space-y-2">
                    {answers.map((ans) => {
                      const isCorrect =
                        ans.correctAnswer.toLowerCase() ===
                        ans.givenAnswer.toLowerCase();
                      return (
                        <div
                          key={ans.correctAnswer}
                          className={`space-y-1 rounded-lg border p-3 ${isCorrect ? "border-primary bg-primary/10" : "border-destructive bg-destructive/10"}`}
                        >
                          <div className="flex items-center">
                            {isCorrect ? (
                              <Check className="mr-2 h-4 w-4 text-primary" />
                            ) : (
                              <X className="mr-2 h-4 w-4 text-destructive " />
                            )}
                            <div>
                              {!isCorrect && "Correct answer: "}
                              <span className="font-semibold">
                                {ans.correctAnswer}
                              </span>
                            </div>
                          </div>
                          {!isCorrect && (
                            <div className="ml-6">
                              Your answer:{" "}
                              <span className="font-semibold">
                                {ans.givenAnswer}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollArea>
            </div>
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
              <span className="font-semibold">{getTimeLeft(timeLeft)}</span> (15
              secs per part).
            </li>
            <li>
              Closing the page mid test or being unable to finish the test on
              time dismisses your progress.
            </li>
            <li>Don&apos;t forget to submit results once done.</li>
          </ul>
          <DialogFooter>
            <span>Good Luck! 😉</span>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TakeTestLayout;
