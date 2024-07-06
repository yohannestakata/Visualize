import { NavLink } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { BookOpen, LogOut, User, UserPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import useLogout from "../hooks/useLogout";
import useUser from "../hooks/useUser";

function SuperAdminNavigation() {
  const { user } = useUser();
  const logout = useLogout();
  const splitUsername = user?.nickname?.split(" ");
  let avatarAbriv = "";

  if (splitUsername) {
    if (splitUsername[0]) avatarAbriv += splitUsername[0][0];
    if (splitUsername[1]) avatarAbriv += splitUsername[1][0];
  }

  return (
    <nav>
      <div className="flex items-center justify-between pb-2 pt-4">
        <div className="flex items-center gap-6">
          <NavLink to={"/super-admin"}>
            <img src="../../../images/logo.svg" className="w-10" alt="" />
          </NavLink>
          <div className="flex items-center justify-between gap-2">
            <NavLink
              className={
                buttonVariants({ variant: "ghost" }) + " bg-background"
              }
              to={"/super-admin/create-department"}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Create Department</span>
            </NavLink>
            <NavLink
              className={
                buttonVariants({ variant: "ghost" }) + " bg-background"
              }
              to={"/super-admin/create-accounts"}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Create Accounts</span>
            </NavLink>
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

export default SuperAdminNavigation;
