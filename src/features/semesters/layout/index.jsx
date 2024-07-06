import { NavLink } from "react-router-dom";
import Heading from "../../../components/Heading";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

function SemestersLayout() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading as="h1">Semesters</Heading>
        <NavLink
          to="/semesters/new"
          className={buttonVariants({ variant: "default" })}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Semester
        </NavLink>
      </div>
    </div>
  );
}

export default SemestersLayout;
