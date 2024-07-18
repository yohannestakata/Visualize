import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import Heading from "../../../components/Heading";
import { Button } from "@/components/ui/button";
import { ListEnd, ListRestart, Send, Timer } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import { useToast } from "@/components/ui/use-toast";
import useUser from "../../../hooks/useUser";

function TakeExamLayout() {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const classroomId = searchParams.get("classroomId");
  const { data: classroomData } = useQuery({
    queryKey: ["classroom", classroomId],
  });
  const classroom = classroomData?.data?.data;
  const exam = classroom?.exam;

  const [ansCheck, setAnsCheck] = useState([]);
  const [time, setTime] = useState(5);
  const [startExam, setStartExam] = useState(false);
  const [finishExam, setFinishExam] = useState(false);

  const randomQuestions = useMemo(() => {
    const shuffledExams = exam?.sort(() => 0.5 - Math.random());
    return shuffledExams.slice(0, 5);
  }, [exam]);

  useEffect(() => {
    if (!startExam) return;
    if (time <= 0) {
      setFinishExam(true);
      return;
    }
    console.log(time);
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [startExam, time]);

  const { user } = useUser();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updateScore, isPending: isUpdatingScore } = useMutation({
    mutationFn: () =>
      axios({
        url: `${SERVER_URL}/users/updateScore/${user?._id}`,
        method: "patch",
        data: {
          newScore:
            (ansCheck.reduce((acc, curr) => {
              if (curr) return (acc += 1);
              else return acc;
            }, 0) /
              5) *
            100,
        },
      }),

    onSuccess: () => {
      navigate(`/learn/classroom?classroomId=${classroomId}`);
      queryClient.invalidateQueries(["user"]);
      toast({ title: "Score updated!" });
    },
  });

  function handleSubmitClick() {
    updateScore();
  }

  function handleRestart() {
    setFinishExam(false);
    setAnsCheck([]);
    setTime(60 * 5);
    setStartExam(false);
  }

  if (finishExam)
    return (
      <div className="mt-6 flex flex-1 flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <span className=" text-lg">Score 🎉</span>
          <span className="text-8xl font-semibold">
            {(ansCheck.reduce((acc, curr) => {
              if (curr) return (acc += 1);
              else return acc;
            }, 0) /
              5) *
              100}{" "}
            %
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleRestart}>
            <ListRestart className="mr-2 h-4 w-4" /> Restart
          </Button>
          <Button onClick={handleSubmitClick} disabled={isUpdatingScore}>
            <Send className="mr-2 h-4 w-4" /> Submit
          </Button>
        </div>
      </div>
    );
  return (
    <div className="mt-6 grid grid-cols-9 gap-4">
      <div className="col-span-7 col-start-2">
        <div className="flex justify-between">
          <Heading>{classroom.name} Exam</Heading>
          {!startExam ? (
            <Button onMouseDown={() => setStartExam(true)}>
              <Timer className="mr-2 h-4 w-4" /> Start Exam
            </Button>
          ) : (
            <div className="flex items-center">
              <Timer className="mr-2 h-4 w-4" />
              <span>{`0${Math.floor(time / 60)}:${time % 60}`}</span>
            </div>
          )}
        </div>
        {startExam && (
          <div className="mt-4 flex flex-col gap-4">
            {randomQuestions?.map((question, index) => {
              return (
                <div key={question.question}>
                  <p>
                    {index + 1}. {question.question}
                  </p>
                  <ul className="ml-4 mt-2 flex flex-col gap-2">
                    <RadioGroup
                      onValueChange={(value) =>
                        setAnsCheck((prev) => {
                          const checks = [...prev];
                          checks[index] = value === question.correctOption;
                          return checks;
                        })
                      }
                    >
                      {question.options.map((option, index) => (
                        <li
                          key={option + index}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={index + 1}
                            id={option + question.question}
                          />
                          <Label htmlFor={option + question.question}>
                            {option}
                          </Label>
                        </li>
                      ))}
                    </RadioGroup>
                  </ul>
                </div>
              );
            })}
          </div>
        )}
        {startExam && (
          <Button className="mt-4" onClick={() => setFinishExam(true)}>
            <ListEnd className="mr-2 h-4 w-4" />
            Finish
          </Button>
        )}
      </div>
    </div>
  );
}

export default TakeExamLayout;
