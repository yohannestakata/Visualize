import { Outlet } from "react-router-dom";
import SuperAdminNavigation from "../components/SuperAdminNavigation";

function SuperAdmin() {
  return (
    <div>
      <SuperAdminNavigation />
      <Outlet />
    </div>
  );
}

export default SuperAdmin;
