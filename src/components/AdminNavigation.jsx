import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import useUser from "../hooks/useUser";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { NavLink } from "react-router-dom";
import {
  Book,
  BookOpen,
  LogOut,
  Plus,
  Settings2,
  User,
  UserPlus,
  Users,
  Users2,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import useLogout from "../hooks/useLogout";

function ListItem({ link, title, description, Icon }) {
  return (
    <NavLink
      className={"flex flex-col gap-1 rounded-lg p-3 hover:bg-secondary"}
      to={link}
    >
      <div className="flex items-center">
        {Icon}
        <span>{title}</span>
      </div>
      <p className="ml-6 text-muted-foreground">{description}</p>
    </NavLink>
  );
}

function AdminNavigation() {
  const { user } = useUser();
  const logout = useLogout();

  const splitUsername = user?.nickname?.split(" ");
  let avatarAbriv = "";

  if (splitUsername) {
    if (splitUsername[0]) avatarAbriv += splitUsername[0][0];
    if (splitUsername[1]) avatarAbriv += splitUsername[1][0];
  }

  const setupTabs = [
    {
      icon: <Book className="mr-2 h-4 w-4" />,
      title: "Departments",
      description: "Setup departments and courses",
      link: "/admin/department-settings",
    },
    {
      icon: <Users className="mr-2 h-4 w-4" />,
      title: "Batches",
      description: "Add and setup batches",
      link: "/teacher/model-guideline",
    },
  ];
  const classroomsTabs = [
    {
      icon: <Plus className="mr-2 h-4 w-4" />,
      title: "Create Classroom",
      description: "Create and customize virtual classrooms.",
      link: "/teacher/create-classroom",
    },
    {
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      title: "My Classrooms",
      description: "Manage existing classrooms.",
      link: "/teacher/classrooms",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/70 pt-4 backdrop-blur-xl">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-6">
          <div>
            <img src="../../../images/logo.svg" className="w-10" alt="" />
          </div>
          <div className="flex items-center gap-1">
            <NavLink
              className={
                buttonVariants({ variant: "ghost" }) + " bg-background"
              }
              to={"/teacher/activity"}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Teacher Registration</span>
            </NavLink>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Settings2 className="mr-2 h-4 w-4" /> Set up
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-4 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {setupTabs.map((tab) => (
                        <ListItem
                          key={tab.title}
                          title={tab.title}
                          description={tab.description}
                          Icon={tab.icon}
                          link={tab.link}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Users2 className="mr-2 h-4 w-4" /> Classrooms
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-4 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {classroomsTabs.map((tab) => (
                        <ListItem
                          key={tab.title}
                          title={tab.title}
                          description={tab.description}
                          Icon={tab.icon}
                          link={tab.link}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex gap-2">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>{avatarAbriv.toUpperCase()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logout();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
    </nav>
  );
}

export default AdminNavigation;
