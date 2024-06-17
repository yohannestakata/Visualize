function MiniLeaderboard() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <span className="text-xl font-semibold">Leaderboards</span>
      <table className="mt-6 ">
        <tbody>
          <tr>
            <td className="py-1 pr-2 text-right text-lg">#1</td>
            <td className="px-2 py-1 text-lg ">Yohannes Takata</td>
            <td className="px-2 py-1 text-right  text-lg">30000 points</td>
          </tr>
          <tr>
            <td className="py-1 pr-2 text-right  text-lg">#2</td>
            <td className="px-2 py-1 text-lg ">John Doe</td>
            <td className="px-2 py-1 text-right  text-lg">25600 points</td>
          </tr>
          <tr>
            <td className="py-1 pr-2 text-right  text-lg">#3</td>
            <td className="px-2 py-1 text-lg ">Jane Doe</td>
            <td className="px-2 py-1 text-right  text-lg">25200 points</td>
          </tr>
          <tr className=" text-primary">
            <td className="py-1 pr-2 text-right text-lg font-semibold">#7</td>
            <td className="px-2 py-1 text-lg font-semibold">You</td>
            <td className="px-2 py-1 text-right text-lg font-semibold">
              17000 points
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MiniLeaderboard;
