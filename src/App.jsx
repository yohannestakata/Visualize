import { ThemeProvider } from "@/components/theme-provider";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AuthLayout from "./features/auth/layouts/AuthLayout";
import Signup from "./features/auth/components/Signup";
import Login from "./features/auth/components/Login";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import ProtectRoutes from "./features/auth/components/ProtectRoute";

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
