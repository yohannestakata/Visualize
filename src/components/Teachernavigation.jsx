import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import useUser from "../hooks/useUser";
import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { Boxes, Plus, Upload } from "lucide-react";

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
      <div className="flex justify-between items-center pb-2">
        <div className="flex gap-6 items-center">
          <div>
            <img src="../../../images/logo.svg" className="w-10" alt="" />
          </div>
          <div className="flex gap-2">
            <NavLink
              className={
                buttonVariants({ variant: "ghost", size: "sm" }) +
                " text-muted-foreground"
              }
              to={"/teacher/classrooms"}
            >
              <Boxes className="w-4 h-4 mr-2" />
              My Classrooms
            </NavLink>
            <NavLink
              className={
                buttonVariants({ variant: "ghost", size: "sm" }) +
                " text-muted-foreground"
              }
              to={"/teacher/create-classroom"}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Classroom
            </NavLink>
            <NavLink
              className={
                buttonVariants({ variant: "ghost", size: "sm" }) +
                " text-muted-foreground"
              }
              to={"/teachers/upload"}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Model
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
