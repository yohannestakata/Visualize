import { ArrowLeft } from "lucide-react";
import { NavLink, useRouteError } from "react-router-dom";

function ErrorBoundary() {
  let error = useRouteError();

  return (
    <div className="flex items-center justify-center flex-col gap-2 h-full flex-1">
      <h1 className="text-8xl text-center">{error.status}</h1>
      <h2>{error.data}</h2>
      <NavLink to={-1} className="flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        Go back
      </NavLink>
    </div>
  );
}

export default ErrorBoundary;
