import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Heading from "../../../components/Heading";
import useUser from "../../../hooks/useUser";
import { SERVER_URL } from "../../../data/globals";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function QuestCard() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { mutate: updateStreak } = useMutation({
    mutationFn: () =>
      axios({
        url: `${SERVER_URL}/users/updateStreak/${user._id}`,
        method: "patch",
        data: {},
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
  useEffect(() => updateStreak(), [updateStreak, user]);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-xl">Streak 🔥</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Heading className="text-center text-6xl">
            {user?.streak} Days
          </Heading>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuestCard;
