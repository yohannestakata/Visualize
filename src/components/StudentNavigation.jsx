import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import useUser from "../hooks/useUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ListCheck, LogOut, User } from "lucide-react";
import useLogout from "../hooks/useLogout";
import { NavLink, useNavigate } from "react-router-dom";

import RegisterDialog from "./RegisterDialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../data/globals";

function StudentNaviagtion() {
  const { user } = useUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const splitUsername = user?.nickname?.split(" ");
  let avatarAbriv = "";

  if (splitUsername) {
    if (splitUsername[0]) avatarAbriv += splitUsername[0][0];
    if (splitUsername[1]) avatarAbriv += splitUsername[1][0];
  }

  const { data } = useQuery({
    queryFn: () =>
      axios({
        url: `${SERVER_URL}/notifications`,
        method: "get",
      }),
    queryKey: ["notifications"],
  });

  const notifications = data?.data?.data;

  return (
    <nav>
      <div className="flex items-center justify-between pb-2 pt-4">
        <div className="flex items-center gap-6">
          <NavLink to={"/learn/models"}>
            <img
              src="../../../images/logo.svg"
              className="w-10 bg-background"
              alt=""
            />
          </NavLink>
          <RegisterDialog />
        </div>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Bell />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              {notifications?.map((notif) => {
                return (
                  <>
                    <DropdownMenuItem
                      key={notif._id}
                      onClick={() => {
                        navigate(`/learn/learn-model?modelId=${notif.link}`);
                      }}
                      className="flex w-80 flex-col items-start gap-2 hover:bg-accent"
                    >
                      <span className="text-base font-semibold">
                        {notif.title}
                      </span>
                      <p>{notif.description}</p>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
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
              <DropdownMenuItem
                onClick={() => {
                  navigate("/learn/update-profile");
                }}
              >
                <User className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {user?.representing && (
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/learn/manage-section");
                  }}
                >
                  <ListCheck className="mr-2 h-4 w-4" /> Manage section
                </DropdownMenuItem>
              )}
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
          <ModeToggle />
        </div>
      </div>
      <Separator />
    </nav>
  );
}

export default StudentNaviagtion;
