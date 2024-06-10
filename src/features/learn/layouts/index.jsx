import ClassroomSection from "../components/ClassroomSection";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";
import MiniLeaderboard from "../components/MiniLeaderboard";
import LeaderboardCard from "../components/LeaderboardCard";
import QuestCard from "../components/QuestCard";

function LearnLayout() {
  const [open, setOpen] = useState(false);

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
            <MiniLeaderboard />
            <LeaderboardCard />
            <QuestCard />
          </div>
        </div>
      </div>

      {/* COMMAND DIALOG */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default LearnLayout;
