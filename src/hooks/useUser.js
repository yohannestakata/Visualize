import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function useUser() {
  const context = useContext(UserContext);

  if (context === undefined)
    return new Error("User useUser withing UserContext.Provider scope");

  return context;
}

export default useUser;
