import { useEffect } from "react";
import useVerifyUser from "../hooks/useVerifyUser";
import { useNavigate } from "react-router-dom";

function ProtectRoutes({ children }) {
  const { data, isLoading } = useVerifyUser();

  const navigate = useNavigate();

  console.log(data?.user);

  useEffect(() => {
    if (isLoading) return;
    if (!data?.user) navigate("/auth/signup");
  }, [data, isLoading]);

  return <div>{children}</div>;
}

export default ProtectRoutes;
