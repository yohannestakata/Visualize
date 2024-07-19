import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../../../data/globals";
import useUser from "../../../hooks/useUser";

function NextToBeat() {
  const { data: usersData } = useQuery({
    queryFn: () => axios({ url: `${SERVER_URL}/users`, method: "get" }),
    queryKey: ["users"],
  });
  const { user } = useUser();
  const leaderboard = usersData?.data?.data
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
    .sort((curr, next) => next.score - curr.score);

  let userIndex;

  leaderboard?.forEach((leader, index) => {
    if (leader.id === user._id) userIndex = index;
  });

  if (!leaderboard) return;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Next To Beat 📈</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <table>
            <tbody>
              {leaderboard[userIndex - 1] ? (
                <>
                  <tr key={user._id}>
                    <td className="py-1 pr-3 text-right text-lg">
                      #{userIndex}
                    </td>
                    <td className="px-3 py-1 text-lg ">
                      {leaderboard[userIndex - 1].nickname}
                    </td>
                    <td className="py-1 pl-3 text-right  text-lg">
                      {leaderboard[userIndex - 1].score} points
                    </td>
                  </tr>
                  <tr className="text-primary">
                    <td className="py-1 pr-3 text-right text-lg">
                      #{userIndex + 1}
                    </td>
                    <td className="px-3 py-1 text-lg ">
                      {leaderboard[userIndex].nickname}
                    </td>
                    <td className="py-1 pl-3 text-right  text-lg">
                      {leaderboard[userIndex].score} points
                    </td>
                  </tr>
                </>
              ) : (
                <div className="text-xl font-semibold">
                  You&apos;re on top of your game! 🏅
                </div>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default NextToBeat;
