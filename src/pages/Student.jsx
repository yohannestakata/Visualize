import { Outlet } from "react-router-dom";
import StudentNaviagtion from "../components/StudentNavigation";

function Student() {
  return (
    <>
      <StudentNaviagtion />
      <Outlet />
    </>
  );
}

export default Student;
