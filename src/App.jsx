import { ThemeProvider } from "@/components/theme-provider";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AuthLayout from "./features/auth/layouts/AuthLayout";
import Signup from "./features/auth/components/Signup";
import Login from "./features/auth/components/Login";
import axios from "axios";
import ProtectRoutes from "./features/auth/components/ProtectRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LearnLayout from "./features/learn/layouts";
import { UserProvider } from "./context/UserContext";
import Teacher from "./pages/Teacher";
import CreateClassroomLayout from "./features/create-classroom/Layout";
import ClassroomList from "./features/learn/components/ClassroomList";
import ErrorBoundary from "./components/ErrorBoundary";
import PrepareModelLayout from "./features/prepare-model/layout";
import { Toaster } from "@/components/ui/toaster";
import UploadedModels from "./features/uploaded-models/layouts";
import AddModelDescriptionsLayout from "./features/add-descriptions/layouts";

axios.defaults.withCredentials = true;

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

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-4">
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </UserProvider>
    </div>
  );
}

export default App;
