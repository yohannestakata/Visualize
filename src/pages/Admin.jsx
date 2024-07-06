import { Outlet } from "react-router-dom";
import AdminNavigation from "../components/AdminNavigation";

function Admin() {
  return (
    <div className="space-y-6">
      <AdminNavigation />
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
