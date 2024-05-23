import { useRouteError } from "react-router-dom";

function ErrorBoundary() {
  let error = useRouteError();

  return (
    <div className="flex items-start px-72 mx-auto justify-start mt-4 flex-col gap-2 h-screen">
      <h1 className="text-5xl">{error.status}</h1>
      <h2>{error.data}</h2>
      <p>{error.error.stack}</p>
    </div>
  );
}

export default ErrorBoundary;
