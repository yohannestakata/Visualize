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
import { FolderDot, LogOut, User, Users2 } from "lucide-react";
import useLogout from "../hooks/useLogout";

function AdminNavigation() {
  const { user } = useUser();
  const logout = useLogout();

  const splitUsername = user?.nickname?.split(" ");
  let avatarAbriv = "";

  if (splitUsername) {
    if (splitUsername[0]) avatarAbriv += splitUsername[0][0];
    if (splitUsername[1]) avatarAbriv += splitUsername[1][0];
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/70 pt-4 backdrop-blur-xl">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-6">
          <NavLink to="/admin">
            <img
              src="../../../images/logo.svg"
              className="w-10 bg-background"
              alt=""
            />
          </NavLink>
          <div className="flex items-center gap-1">
            <NavLink
              className={
                buttonVariants({ variant: "ghost" }) + " bg-background"
              }
              to={"/admin/batches"}
            >
              <Users2 className="mr-2 h-4 w-4" />
              <span>Batches</span>
            </NavLink>
            <NavLink
              className={
                buttonVariants({ variant: "ghost" }) + " bg-background"
              }
              to={"/admin/semesters"}
            >
              <FolderDot className="mr-2 h-4 w-4" />
              <span>Semesters</span>
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

export default AdminNavigation;
