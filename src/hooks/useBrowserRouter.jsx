import AuthLayout from "../features/auth/layouts/AuthLayout";
import Signup from "../features/auth/components/Signup";
import Login from "../features/auth/components/Login";
import ProtectRoutes from "../features/auth/components/ProtectRoute";
import LearnLayout from "../features/learn/layouts";
import Teacher from "../pages/Teacher";
import CreateClassroomLayout from "../features/create-classroom/Layout";
import ClassroomList from "../features/learn/components/ClassroomList";
import ErrorBoundary from "../components/ErrorBoundary";
import PrepareModelLayout from "../features/prepare-model/layout";
import UploadedModels from "../features/uploaded-models/layouts";
import AddModelDescriptionsLayout from "../features/add-descriptions/layouts";
import { Outlet, createBrowserRouter } from "react-router-dom";
import ModelDetailsLayout from "../features/model-details/layout";
import LearnModelLayout from "../features/learn-model/layout";
import Student from "../pages/Student";
import TakeTestLayout from "../features/take-test/layout";
import Admin from "../pages/Admin";
import DepartmentSettingsLayout from "../features/department-settings/layout";
import DepartmentSetupLayout from "../features/department-setup/layout";
import CourseSetupLayout from "../features/course-setup/layout";
import CourseSettingsLayout from "../features/course-settings/layout";
import SuperAdmin from "../pages/SuperAdmin";
import CreateAccountsLayout from "../features/create-accounts/layout";

function useBrowserRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorBoundary />,
      element: (
        // <ProtectRoutes>
        <Outlet />
        // </ProtectRoutes>
      ),
      children: [
        {
          path: "/auth",
          element: <AuthLayout />,
          children: [
            {
              path: "/auth/signup",
              element: <Signup />,
            },
            {
              path: "/auth/login",
              element: <Login />,
            },
          ],
        },
        {
          path: "/learn",
          element: <Student />,
          children: [
            { path: "/learn/models", element: <LearnLayout /> },
            {
              path: "/learn/learn-model",
              element: <LearnModelLayout />,
            },
            {
              path: "/learn/take-test",
              element: <TakeTestLayout />,
            },
          ],
        },
        {
          path: "/super-admin",
          element: <SuperAdmin />,
          children: [
            {
              path: "/super-admin/create-accounts",
              element: <CreateAccountsLayout />,
            },
            {
              path: "/super-admin/create-department",
              element: "create department",
            },
          ],
        },
        {
          path: "/admin",
          element: <Admin />,
          children: [
            {
              path: "/admin/department-settings",
              element: <DepartmentSettingsLayout />,
            },
            {
              path: "/admin/department-setup",
              element: <DepartmentSetupLayout />,
            },
            {
              path: "/admin/course-settings",
              element: <CourseSettingsLayout />,
            },
            {
              path: "/admin/course-setup",
              element: <CourseSetupLayout />,
            },
          ],
        },
        {
          path: "/teacher",
          element: <Teacher />,
          children: [
            {
              path: "/teacher/create-classroom",
              element: <CreateClassroomLayout />,
            },
            {
              path: "/teacher/classrooms",
              element: <ClassroomList />,
            },
            {
              path: "/teacher/prepare-model",
              element: <PrepareModelLayout />,
            },
            {
              path: "/teacher/models",
              element: <UploadedModels />,
            },
            {
              path: "/teacher/model-details",
              element: <ModelDetailsLayout />,
            },
            {
              path: "/teacher/add-model-definitions",
              element: <AddModelDescriptionsLayout />,
            },
          ],
        },
      ],
    },
  ]);

  return router;
}

export default useBrowserRouter;
