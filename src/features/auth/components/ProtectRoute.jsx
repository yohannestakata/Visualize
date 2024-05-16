import { useEffect } from "react";
import useVerifyUser from "../hooks/useVerifyUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

function ProtectRoutes({ children }) {
  const { data, isLoading } = useVerifyUser();

  const navigate = useNavigate();

  const user = data?.user;
  console.log(user);

  useEffect(() => {
    if (isLoading) return;
    if (!user) navigate("/auth/signup");
    if (user?.role === "Student") navigate("/learn");
    if (user?.role === "Admin") navigate("/admin");
  }, [user, isLoading, navigate]);

  return <div>{children}</div>;
}

export default ProtectRoutes;
