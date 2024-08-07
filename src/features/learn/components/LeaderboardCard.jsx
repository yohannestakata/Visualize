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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Better luck next time!</CardTitle>
        {/* <CardDescription>Better luck next time!</CardDescription> */}
      </CardHeader>
      <CardContent>
        You finished <b className="font-semibold">#32</b> and stayed in the{" "}
        <b className="font-semibold">silver league</b>.
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-full">Go to leaderboards</Button>
      </CardFooter>
    </Card>
  );
}

export default LeaderboardCard;
