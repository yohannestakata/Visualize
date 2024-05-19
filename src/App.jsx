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

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
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
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="px-6 py-4 ">
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </UserProvider>
    </div>
  );
}

export default App;
