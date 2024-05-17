import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function LeaderboardCard() {
  return (
    <Card className="w-full bg-transparent">
      <CardHeader>
        <CardTitle className="text-xl">Better luck next time!</CardTitle>
        {/* <CardDescription>Better luck next time!</CardDescription> */}
      </CardHeader>
      <CardContent>
        You finished #32 and stayed in the silver league.
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-full">Go to leaderboards</Button>
      </CardFooter>
    </Card>
  );
}

export default LeaderboardCard;
