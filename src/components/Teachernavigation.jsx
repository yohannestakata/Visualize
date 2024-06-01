import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import useUser from "../hooks/useUser";
import { buttonVariants } from "@/components/ui/button";

import { NavLink } from "react-router-dom";
import {
  Activity,
  BookOpen,
  Boxes,
  ClipboardList,
  Edit3,
  Plus,
  Users2,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
          <div className="flex items-center gap-6">
            <NavLink
              className={buttonVariants({ variant: "ghost" })}
              to={"/teacher/activity"}
            >
              <Activity className="mr-2 h-4 w-4" />
              <span>Activity</span>
            </NavLink>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Boxes className="mr-2 h-4 w-4" /> Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-4 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {" "}
                      <NavLink
                        className={
                          "flex flex-col gap-1 rounded-lg p-3 hover:bg-secondary"
                        }
                        to={"/teacher/prepare-model"}
                      >
                        <div className="flex items-center">
                          <Edit3 className="mr-2 h-4 w-4" />
                          <span>Prepare Model</span>
                        </div>
                        <p className="ml-6 text-muted-foreground">
                          Create and define new models.
                        </p>
                      </NavLink>
                      <NavLink
                        className={
                          "flex flex-col gap-1 rounded-lg p-3 hover:bg-secondary"
                        }
                        to={"/teacher/models"}
                      >
                        <div className="flex items-center">
                          <Boxes className="mr-2 h-4 w-4" />
                          <span>My Models</span>
                        </div>
                        <p className="ml-6 text-muted-foreground">
                          Manage existing models.
                        </p>
                      </NavLink>
                      <NavLink
                        className={
                          "flex flex-col gap-1 rounded-lg p-3 hover:bg-secondary"
                        }
                        to={"/teacher/activity"}
                      >
                        <div className="flex items-center">
                          <ClipboardList className="mr-2 h-4 w-4" />
                          <span>Guideline</span>
                        </div>
                        <p className="ml-6 text-muted-foreground">
                          Rules, expectations, and objectives.
                        </p>
                      </NavLink>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Users2 className="mr-2 h-4 w-4" /> Classrooms
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-4 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <NavLink
                        className={
                          "flex flex-col gap-1 rounded-lg p-3 hover:bg-secondary"
                        }
                        to={"/teacher/create-classroom"}
                      >
                        <div className="flex items-center">
                          <Plus className="mr-2 h-4 w-4" />
                          <span className="font-semibold">
                            Create Classroom
                          </span>
                        </div>
                        <p className="ml-6 text-muted-foreground">
                          Setup and customize virtual classrooms.
                        </p>
                      </NavLink>
                      <NavLink
                        className={
                          "flex flex-col gap-1 rounded-lg p-3 hover:bg-secondary"
                        }
                        to={"/teacher/classrooms"}
                      >
                        <div className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>My Classrooms</span>
                        </div>
                        <p className="ml-6 text-muted-foreground">
                          Manage existing classrooms.
                        </p>
                      </NavLink>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
