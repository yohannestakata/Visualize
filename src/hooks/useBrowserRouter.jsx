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

function useBrowserRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorBoundary />,
      element: (
        <ProtectRoutes>
          <Outlet />
        </ProtectRoutes>
      ),
      children: [
        {
          path: "/learn",
          element: <LearnLayout />,
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
              path: "/teacher/add-model-definitions",
              element: <AddModelDescriptionsLayout />,
            },
          ],
        },
      ],
    },
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
  ]);

  return router;
}

export default useBrowserRouter;
