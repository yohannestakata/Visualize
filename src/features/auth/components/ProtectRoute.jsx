import { useEffect } from "react";
import useVerifyUser from "../hooks/useVerifyUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUser from "../../../hooks/useUser";

axios.defaults.withCredentials = true;

function ProtectRoutes({ children }) {
  const navigate = useNavigate();
  const { dispatch } = useUser();
  const { data, isLoading } = useVerifyUser();

  const user = data?.user;

  useEffect(() => {
    if (isLoading) return;
    if (!user) navigate("/auth/signup");

    dispatch({ type: "setUser", payload: user });

    if (user?.role === "Student") navigate("/learn");
    if (user?.role === "Admin") navigate("/admin");
  }, [user, isLoading, navigate, dispatch]);

  return <div>{children}</div>;
}

export default ProtectRoutes;
