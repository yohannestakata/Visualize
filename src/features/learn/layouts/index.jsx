import ClassroomSection from "../components/ClassroomSection";
import { BookOpen, Boxes } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useState } from "react";
import MiniLeaderboard from "../components/MiniLeaderboard";
import QuestCard from "../components/QuestCard";
import useUser from "../../../hooks/useUser";
import useGetModels from "../../../hooks/useGetModels";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import { useQuery } from "@tanstack/react-query";
import NextToBeat from "../components/NextToBeat";

function LearnLayout() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const userSections = user?.sections;
  const { data: models } = useGetModels({
    department: user?.department,
  });
  const { data: classroomData } = useQuery({
    queryKey: ["classrooms"],
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/classrooms?sections=${userSections.map((sect) => sect._id)}`,
      }),
  });

  const classrooms = classroomData?.data?.data;

  const navigate = useNavigate();

  return (
    <>
      <div className="mt-6 grid grid-cols-12 gap-4">
        {/* CLASSROOMS */}
        <div className="col-span-8">
          <ClassroomSection openCommand={setOpen} />
        </div>

        {/* LEADERBOARDS, QUEST PROGRESS */}
        <div className="col-span-4">
          <div className="sticky top-4 flex flex-col gap-4">
            <QuestCard />
            <MiniLeaderboard />
            <NextToBeat />
            {/* <LeaderboardCard /> */}
          </div>
        </div>
      </div>

      {/* COMMAND DIALOG */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type model or classroom name..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            <CommandGroup heading="Models">
              {models?.data.map((model) => (
                <CommandItem
                  key={model._id}
                  onSelect={() => {
                    navigate(`/learn/learn-model?modelId=${model._id}`);
                  }}
                >
                  <Boxes className="mr-2 h-4 w-4" />
                  <span>{model.modelTitle}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup heading="Classrooms">
              {classrooms?.map((classroom) => (
                <CommandItem
                  key={classroom._id}
                  onSelect={() => {
                    navigate(`/learn/classroom?classroomId=${classroom._id}`);
                  }}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>{classroom.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default LearnLayout;
