import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import useUser from "../hooks/useUser";
import { NavLink } from "react-router-dom";
import { Activity, BookOpen, Boxes, Plus, Upload } from "lucide-react";

function TeacherNavigation() {
  const { user } = useUser();

  const splitUsername = user?.nickname?.split(" ");
  let avatarAbriv = "";

  if (splitUsername) {
    if (splitUsername[0]) avatarAbriv += splitUsername[0][0];
    if (splitUsername[1]) avatarAbriv += splitUsername[1][0];
  }

  return (
    <nav>
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-7">
          <div>
            <img src="../../../images/logo.svg" className="w-10" alt="" />
          </div>
          <div className="flex gap-5">
            <NavLink
              className={"flex items-center text-muted-foreground"}
              to={"/teacher/activity"}
            >
              <Activity className="mr-2 h-4 w-4" />
              <span>Activity</span>
            </NavLink>
            <NavLink
              className={"flex items-center text-muted-foreground"}
              to={"/teacher/models"}
            >
              <Boxes className="mr-2 h-4 w-4" />
              <span>My Models</span>
            </NavLink>
            <NavLink
              className={"flex items-center text-muted-foreground"}
              to={"/teacher/classrooms"}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              <span>My Classrooms</span>
            </NavLink>

            <NavLink
              className={"flex items-center text-muted-foreground"}
              to={"/teacher/upload-model"}
            >
              <Upload className="mr-2 h-4 w-4" />
              <span>Upload Model</span>
            </NavLink>
            <NavLink
              className={"flex items-center text-muted-foreground"}
              to={"/teacher/create-classroom"}
            >
              <Plus className="mr-2 h-4 w-4" />
              <span>Create Classroom</span>
            </NavLink>
          </div>
        </div>
        <div className="flex gap-2">
          <ModeToggle />
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{avatarAbriv.toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Separator />
    </nav>
  );
}

export default TeacherNavigation;
