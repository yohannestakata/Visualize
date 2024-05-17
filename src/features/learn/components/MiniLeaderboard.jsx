import { Star } from "lucide-react";

function MiniLeaderboard() {
  return (
    <div className="">
      <span className="font-semibold text-xl">Leaderboards</span>
      <div className="flex flex-col gap-2 mt-2">
        <span className="flex items-center gap-2">
          <Star className="w-4 h-4" /> Yohannes Takata
        </span>{" "}
        <span className="flex items-center gap-2">
          <Star className="w-4 h-4" /> Yohannes Takata
        </span>{" "}
        <span className="flex items-center gap-2">
          <Star className="w-4 h-4" /> Yohannes Takata
        </span>
        <span className="flex items-center gap-2">
          <span className="font-semibold">#32</span>
          <span className="font-semibold">Yohannes Takata</span>
        </span>
      </div>
    </div>
  );
}

export default MiniLeaderboard;
