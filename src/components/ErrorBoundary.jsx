import { useRouteError } from "react-router-dom";

function ErrorBoundary() {
  let error = useRouteError();

  return (
    <div className="flex items-center justify-center flex-col gap-2 h-full mt-4">
      <h1 className="text-8xl text-center">{error.status}</h1>
      <h2>{error.data}</h2>
      {/* <p>{error.error.stack}</p> */}
    </div>
  );
}

export default ErrorBoundary;
