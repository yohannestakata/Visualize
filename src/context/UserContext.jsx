import { useReducer, createContext } from "react";

function userReducer(state, action) {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.payload };
    default:
      return new Error("No action type defined");
  }
}
const initialState = { user: {} };

const UserContext = createContext();

function UserProvider({ children }) {
  const [{ user }, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
