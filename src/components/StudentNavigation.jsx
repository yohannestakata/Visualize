import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { Boxes } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

function StudentNaviagtion() {
  return (
    <nav>
      <div className="flex justify-between items-center pb-2">
        <div className="flex gap-6 items-center">
          <div>
            <img src="../../../images/logo.svg" className="w-10" alt="" />
          </div>
        </div>
        <div className="flex gap-2">
          <ModeToggle />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>YT</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Separator />
    </nav>
  );
}

export default StudentNaviagtion;
