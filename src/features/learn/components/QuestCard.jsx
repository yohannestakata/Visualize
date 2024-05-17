import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

function QuestCard() {
  return (
    <Card className="w-full bg-transparent">
      <CardHeader>
        <CardTitle className="text-xl">Daily Quests</CardTitle>
        {/* <CardDescription>Better luck next time!</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="space-y-2">
            <span className="text-sm">Earn 10XP</span>
            <Progress value={33} />
          </div>
          <div className="space-y-2">
            <span className="text-sm">Earn 10XP</span>
            <Progress value={100} />
          </div>
          <div className="space-y-2">
            <span className="text-sm">Earn 10XP</span>
            <Progress value={66} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuestCard;
