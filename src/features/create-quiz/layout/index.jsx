import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { SERVER_URL } from "../../../data/globals";
import { useMutation, useQuery } from "@tanstack/react-query";
import Heading from "../../../components/Heading";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

function CreateTestLayout() {
  const [searchParams] = useSearchParams();
  const classroomID = searchParams.get("classroomId");

  const { data: classroomData, isPending: isGettingClassroom } = useQuery({
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/classrooms/${classroomID}`,
        method: "get",
      }),

    queryKey: ["classroom", classroomID],
  });

  const classroom = classroomData?.data?.data;
  console.log(classroom);

  const defaultInput = {
    question: "",
    options: ["", "", "", ""],
    correctOption: "",
  };

  useEffect(() => {
    setAddedQuestions(classroom?.exam);
  }, [classroom?.exam]);

  const [questionInput, setQuestionInput] = useState(defaultInput);

  const [addedQuestions, setAddedQuestions] = useState([]);

  function handleAddQuestions() {
    setAddedQuestions((prev) => [...prev, questionInput]);
    setQuestionInput(defaultInput);
  }

  function handleRemoveQuestions(question) {
    setAddedQuestions((prev) =>
      prev.filter((que) => que.question !== question),
    );
  }

  const { toast } = useToast();

  const { mutate: updateClassroom } = useMutation({
    mutationFn: (fields) =>
      axios({
        url: `${SERVER_URL}/classrooms/${classroomID}`,
        method: "post",
        data: fields,
      }),

    onSuccess: () => {
      toast({
        title: "Changes saved!",
        description: "Questions have been added to the classroom exam.",
      });
    },
  });

  function handleSaveChanges() {
    updateClassroom({ exam: addedQuestions });
  }

  return (
    <div className="grid grid-cols-9 gap-4">
      <div className="col-span-3">
        <Heading as="h1">{classroom?.name} Exam</Heading>
        <div className="mt-6 flex flex-col gap-6">
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="picture">Question</Label>
            <Textarea
              id="picture"
              type="text"
              placeholder="Enter question here"
              value={questionInput.question}
              onChange={(e) =>
                setQuestionInput((prev) => ({
                  ...prev,
                  question: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="opt-1">Option 1</Label>
            <Input
              id="opt-1"
              type="text"
              placeholder="Enter option here"
              value={questionInput.options.at(0)}
              onChange={(e) =>
                setQuestionInput((prev) => {
                  const newOptions = [...prev.options];
                  newOptions[0] = e.target.value;
                  return {
                    ...prev,
                    options: newOptions,
                  };
                })
              }
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="opt-2">Option 2</Label>
            <Input
              id="opt-2"
              type="text"
              placeholder="Enter option here"
              value={questionInput.options[1]}
              onChange={(e) =>
                setQuestionInput((prev) => {
                  const newOptions = [...prev.options];
                  newOptions[1] = e.target.value;
                  return {
                    ...prev,
                    options: newOptions,
                  };
                })
              }
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="opt-3">Option 3</Label>
            <Input
              id="opt-3"
              type="text"
              placeholder="Enter option here"
              value={questionInput.options[2]}
              onChange={(e) =>
                setQuestionInput((prev) => {
                  const newOptions = [...prev.options];
                  newOptions[2] = e.target.value;
                  return {
                    ...prev,
                    options: newOptions,
                  };
                })
              }
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="opt-4">Option 4</Label>
            <Input
              id="opt-4"
              type="text"
              placeholder="Enter option here"
              value={questionInput.options[3]}
              onChange={(e) =>
                setQuestionInput((prev) => {
                  const newOptions = [...prev.options];
                  newOptions[3] = e.target.value;
                  return {
                    ...prev,
                    options: newOptions,
                  };
                })
              }
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="correct-opt">Correct option</Label>
            <Input
              id="correct-opt"
              type="number"
              max={4}
              min={1}
              size="1"
              placeholder="Enter option number here"
              value={questionInput.correctOption}
              onChange={(e) =>
                e.target.value <= 4 &&
                e.target.value > 0 &&
                setQuestionInput((prev) => ({
                  ...prev,
                  correctOption: e.target.value,
                }))
              }
              onKeyDown={(e) => {
                e.code === "Backspace" &&
                  setQuestionInput((prev) => ({
                    ...prev,
                    correctOption: "",
                  }));
              }}
            />
          </div>
          <Button onMouseDown={handleAddQuestions} variant="secondary">
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </div>
      <div className="col-span-6">
        <div className="flex items-center justify-between">
          <Heading as="h2">Added Questions</Heading>
          <Button onClick={handleSaveChanges}>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
        <div className="mt-4 flex w-fit flex-col gap-4">
          {addedQuestions?.map((question, index) => {
            return (
              <div key={question.question} className="flex items-start gap-4">
                <div className="flex-1">
                  <span className="font-semibold">
                    {index + 1}. {question.question}
                  </span>

                  <ul className="mt-1">
                    {question.options.map((opt, index) => (
                      <li
                        key={opt}
                        className={`ml-3 rounded-md p-1 ${index === Number(question.correctOption) - 1 ? "bg-accent" : ""}`}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-fit w-fit p-1 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleRemoveQuestions(question.question)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CreateTestLayout;
