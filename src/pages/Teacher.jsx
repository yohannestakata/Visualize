import { Outlet } from "react-router-dom";
import TeacherNavigation from "../components/Teachernavigation";

function Teacher() {
  return (
    <div>
      <TeacherNavigation />
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Teacher;
