import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";

function MiniLeaderboard() {
  const { data: usersData } = useQuery({
    queryFn: () => axios({ url: `${SERVER_URL}/users`, method: "get" }),
    queryKey: ["users"],
  });

  const leaderboard = usersData?.data?.data
    ?.filter((user) => user.role.toLowerCase() === "student")
    ?.sort((curr, next) => next.streak - curr.streak);

  const top3 = leaderboard?.splice(0, 3);

  console.log(top3);
  return (
    <div className="rounded-lg border bg-card p-6">
      <span className="text-xl font-semibold">Leaderboards</span>
      <table className="mt-6 ">
        <tbody>
          {top3?.map((user, index) => (
            <tr key={user._id}>
              <td className="py-1 pr-3 text-right text-lg">#{index + 1}</td>
              <td className="px-3 py-1 text-lg ">{user.nickname}</td>
              <td className="py-1 pl-3 text-right  text-lg">
                {user.score} points
              </td>
            </tr>
          ))}

          <tr className=" text-primary">
            <td className="py-1 pr-3 text-right text-lg font-semibold">#7</td>
            <td className="px-3 py-1 text-lg font-semibold">You</td>
            <td className="py-1 pl-3 text-right text-lg font-semibold">
              17000 points
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MiniLeaderboard;
