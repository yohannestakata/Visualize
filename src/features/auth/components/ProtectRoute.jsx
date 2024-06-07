import { useEffect } from "react";
import useVerifyUser from "../hooks/useVerifyUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUser from "../../../hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";

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

    if (user?.role === "Student") navigate("/learn");
    if (user?.role === "Admin") navigate("/admin");
    if (user?.role === "Teacher") navigate("/teacher/classrooms");

    return () => {
      queryClient.invalidateQueries({ queryKey: ["user-verify"] });
    };
  }, [user, isLoading, navigate, dispatch, queryClient, token]);

  if (isLoading) return <div>Loading...</div>;

  return <div>{children}</div>;
}

export default ProtectRoutes;
