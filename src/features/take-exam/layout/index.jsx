import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import Heading from "../../../components/Heading";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useMemo, useState } from "react";

function TakeExamLayout() {
  const [searchParams] = useSearchParams();
  const classroomId = searchParams.get("classroomId");
  const { data: classroomData } = useQuery({
    queryKey: ["classroom", classroomId],
  });
  const classroom = classroomData?.data?.data;
  const exam = classroom?.exam;

  const [ansCheck, setAnsCheck] = useState([]);
  const [time, setTime] = useState(120);
  const [startExam, setStartExam] = useState(false);

  const randomQuestions = useMemo(() => {
    const shuffledExams = exam?.sort(() => 0.5 - Math.random());
    return shuffledExams.slice(0, 5);
  }, [exam]);

  console.log(Math.floor(time / 60), time % 60);

  useEffect(() => {
    if (!startExam) return;
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  });

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
      </div>
    </div>
  );
}

export default TakeExamLayout;
