import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function useUser() {
  const context = useContext(UserContext);

  if (context === undefined)
    return new Error("Can't use useUser outside of provider");

  return context;
}

export default useUser;
