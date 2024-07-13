import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "@/components/ui/toaster";
import { RouterProvider } from "react-router-dom";
import useBrowserRouter from "./hooks/useBrowserRouter";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common = {
    Authorization: localStorage.getItem("jwt"),
  };

  const queryClient = new QueryClient();
  const router = useBrowserRouter();

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
