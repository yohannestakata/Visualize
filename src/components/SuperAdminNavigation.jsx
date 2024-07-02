import { NavLink } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { BookOpen, UserPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { buttonVariants } from "@/components/ui/button";

function SuperAdminNavigation() {
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
              to={"/super-admin/create-accounts"}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Create Accounts</span>
            </NavLink>
            <NavLink
              className={
                buttonVariants({ variant: "ghost" }) + " bg-background"
              }
              to={"/super-admin/create-department"}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Create Department</span>
            </NavLink>
          </div>
        </div>
        <div className="flex gap-2">
          <ModeToggle />
        </div>
      </div>
      <Separator />
    </nav>
  );
}

export default SuperAdminNavigation;
