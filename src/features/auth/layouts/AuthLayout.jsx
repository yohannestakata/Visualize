import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex items-center h-screen justify-center w-full overflow-hidden ">
      <div className="flex-1 relative flex justify-center items-center h-full w-full ">
        <img
          src="../../../../public/images/skeleton-man2.png"
          alt=""
          className="h-full object-contain"
        />
        <div className="absolute w-3/4 m-3 bottom-0 p-6 left-0 backdrop-blur-2xl rounded-md">
          <h2 className="text-3xl text-green-500 font-semibold">
            Learn, Play, Excel.
          </h2>
          <p className="mt-2 text">
            Immerse yourself in interactive quizzes, unlock exciting rewards,
            and rise to the top of the leaderboard for an unparalleled
            educational adventure.
          </p>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
