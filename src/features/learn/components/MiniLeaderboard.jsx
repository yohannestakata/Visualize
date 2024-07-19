import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";

function MiniLeaderboard() {
  const { data: usersData } = useQuery({
    queryFn: () => axios({ url: `${SERVER_URL}/users`, method: "get" }),
    queryKey: ["users"],
  });

  const top3 = usersData?.data?.data
    .filter((user) => user.role.toLowerCase() === "student")
    .reduce((accumulator, current) => {
      return [
        ...accumulator,
        {
          score: current.scores
            .map((score) => score.score)
            .reduce((acc, curr) => {
              return (acc += curr);
            }, 0),
          nickname: current.nickname,
          id: current._id,
        },
      ];
    }, [])
    .sort((curr, next) => next.score - curr.score)
    .splice(0, 3);

  return (
    <div className="rounded-lg border bg-card p-6">
      <span className="text-xl font-semibold">Leaderboards</span>
      <table className="mt-6 ">
        <tbody>
          {top3?.map((user, index) => (
            <tr key={user.id}>
              <td className="py-1 pr-3 text-right text-lg">#{index + 1}</td>
              <td className="px-3 py-1 text-lg ">{user.nickname}</td>
              <td className="py-1 pl-3 text-right  text-lg">
                {user.score} points
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MiniLeaderboard;
