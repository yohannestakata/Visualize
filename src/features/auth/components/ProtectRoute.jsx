import { useEffect } from "react";
import useVerifyUser from "../hooks/useVerifyUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUser from "../../../hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

axios.defaults.withCredentials = true;

function ProtectRoutes({ children }) {
  const navigate = useNavigate();
  const { dispatch } = useUser();
  const token = localStorage.getItem("jwt");

  const { data, isLoading } = useVerifyUser();

  const user = data?.user;

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isLoading) return;
    if (!user) navigate("/auth/signup");

    dispatch({ type: "setUser", payload: user });

    if (user?.role === "Student") navigate("/learn/models");
    if (user?.role === "Admin") navigate("/admin");
    if (user?.role === "Teacher") navigate("/teacher/classrooms");

    return () => {
      queryClient.invalidateQueries({ queryKey: ["user-verify"] });
    };
  }, [user, isLoading, navigate, dispatch, queryClient, token]);

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="mt-6 h-8 w-8 animate-spin" />
      </div>
    );

  return <>{children}</>;
}

export default ProtectRoutes;
