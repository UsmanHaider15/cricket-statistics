import React from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { leaguesPlayersStats } from "@/setting";

export async function generateStaticParams() {
  const params: { league: string; id: string }[] = [];

  for (const [league, playersStatsArray] of Object.entries(
    leaguesPlayersStats
  )) {
    // @ts-ignore
    for (const [playerId, playerStats] of playersStatsArray) {
      params.push({ league, id: playerId });
    }
  }

  return params;
}

export default function PlayerStatsComponent({
  params: { league, id },
}: {
  params: { league: string; id: string };
}) {
  // @ts-ignore
  const playerStats = leaguesPlayersStats[league].find((player) => {
    return player[0] === id;
  })[1];

  if (!playerStats) {
    return <div>Player not found</div>;
  }

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4">
        <img
          alt={`${playerStats.name}`}
          className="rounded-full"
          height={120}
          src="/placeholder.svg"
          style={{ aspectRatio: "120/120", objectFit: "cover" }}
          width={120}
        />
        <h1 className="text-2xl font-bold">{playerStats.name}</h1>
      </div>
      <div className="grid w-full max-w-4xl gap-6">
        <div className="grid gap-4">
          <h2 className="text-lg font-semibold">Batting Stats</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Season</TableHead>
                <TableHead>Matches</TableHead>
                <TableHead>Runs</TableHead>
                <TableHead>HS</TableHead>
                <TableHead>Avg</TableHead>
                <TableHead>BF</TableHead>
                <TableHead>SR</TableHead>
                <TableHead>Outs</TableHead>
                <TableHead>NO</TableHead>
                <TableHead>4s</TableHead>
                <TableHead>6s</TableHead>
                <TableHead>50s</TableHead>
                <TableHead>100s</TableHead>
                <TableHead>CT</TableHead>
                <TableHead>SM</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={"batting"}>
                <TableCell>Overall</TableCell>
                <TableCell>{playerStats.overall.batting.matches}</TableCell>
                <TableCell>{playerStats.overall.batting.runs}</TableCell>
                <TableCell>
                  {playerStats.overall.batting.highest_score}
                </TableCell>
                <TableCell>
                  {playerStats.overall.batting.average.toFixed(2)}
                </TableCell>
                <TableCell>{playerStats.overall.batting.balls}</TableCell>
                <TableCell>
                  {playerStats.overall.batting.strike_rate.toFixed(2)}
                </TableCell>
                <TableCell>{playerStats.overall.batting.outs}</TableCell>
                <TableCell>{playerStats.overall.batting.not_outs}</TableCell>
                <TableCell>{playerStats.overall.batting.fours}</TableCell>
                <TableCell>{playerStats.overall.batting.sixes}</TableCell>
                <TableCell>
                  {playerStats.overall.batting.half_centuries}
                </TableCell>
                <TableCell>{playerStats.overall.batting.centuries}</TableCell>
                <TableCell>{playerStats.overall.batting.catches}</TableCell>
                <TableCell>{playerStats.overall.batting.stumpings}</TableCell>
              </TableRow>
              {Object.entries(playerStats.by_season).map(([season, stats]) => (
                <TableRow key={season}>
                  <TableCell>{season}</TableCell>
                  <TableCell>{stats.batting.matches}</TableCell>
                  <TableCell>{stats.batting.runs}</TableCell>
                  <TableCell>{stats.batting.highest_score}</TableCell>
                  <TableCell>{stats.batting.average.toFixed(2)}</TableCell>
                  <TableCell>{stats.batting.balls}</TableCell>
                  <TableCell>{stats.batting.strike_rate.toFixed(2)}</TableCell>
                  <TableCell>{stats.batting.outs}</TableCell>
                  <TableCell>{stats.batting.not_outs}</TableCell>
                  <TableCell>{stats.batting.fours}</TableCell>
                  <TableCell>{stats.batting.sixes}</TableCell>
                  <TableCell>{stats.batting.half_centuries}</TableCell>
                  <TableCell>{stats.batting.centuries}</TableCell>
                  <TableCell>{stats.batting.catches}</TableCell>
                  <TableCell>{stats.batting.stumpings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="grid gap-4">
          <h2 className="text-lg font-semibold">Bowling Stats</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Season</TableHead>
                <TableHead>Matches</TableHead>
                <TableHead>Overs</TableHead>
                <TableHead>Wickets</TableHead>
                <TableHead>Avg</TableHead>
                <TableHead>ER</TableHead>
                <TableHead>SR</TableHead>
                <TableHead>4W</TableHead>
                <TableHead>5W</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={"bowling"}>
                <TableCell>Overall</TableCell>
                <TableCell>{playerStats.overall.bowling.matches}</TableCell>
                <TableCell>
                  {(playerStats.overall.bowling.balls / 6).toFixed(1)}
                </TableCell>
                <TableCell>{playerStats.overall.bowling.wickets}</TableCell>
                <TableCell>
                  {playerStats.overall.bowling.average.toFixed(2)}
                </TableCell>
                <TableCell>
                  {playerStats.overall.bowling.economy_rate.toFixed(2)}
                </TableCell>
                <TableCell>
                  {playerStats.overall.bowling.strike_rate.toFixed(2)}
                </TableCell>
                <TableCell>
                  {playerStats.overall.bowling.four_wickets}
                </TableCell>
                <TableCell>
                  {playerStats.overall.bowling.five_wickets}
                </TableCell>
              </TableRow>
              {Object.entries(playerStats.by_season).map(([season, stats]) => (
                <TableRow key={season}>
                  <TableCell>{season}</TableCell>
                  <TableCell>{stats.bowling.matches}</TableCell>
                  <TableCell>{(stats.bowling.balls / 6).toFixed(1)}</TableCell>
                  <TableCell>{stats.bowling.wickets}</TableCell>
                  <TableCell>{stats.bowling.average.toFixed(2)}</TableCell>
                  <TableCell>{stats.bowling.economy_rate.toFixed(2)}</TableCell>
                  <TableCell>{stats.bowling.strike_rate.toFixed(2)}</TableCell>
                  <TableCell>{stats.bowling.four_wickets}</TableCell>
                  <TableCell>{stats.bowling.five_wickets}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="grid gap-4">
          <h2 className="text-lg font-semibold">
            Batting Stats Against Opposition
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Opponent</TableHead>
                <TableHead>Matches</TableHead>
                <TableHead>Runs</TableHead>
                <TableHead>HS</TableHead>
                <TableHead>Avg</TableHead>
                <TableHead>BF</TableHead>
                <TableHead>SR</TableHead>
                <TableHead>Outs</TableHead>
                <TableHead>NO</TableHead>
                <TableHead>4s</TableHead>
                <TableHead>6s</TableHead>
                <TableHead>50s</TableHead>
                <TableHead>100s</TableHead>
                <TableHead>CT</TableHead>
                <TableHead>SM</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(playerStats.by_opposition).map(
                ([opponent, stats]) => (
                  <TableRow key={opponent}>
                    <TableCell>{opponent}</TableCell>
                    <TableCell>{stats.batting.matches}</TableCell>
                    <TableCell>{stats.batting.runs}</TableCell>
                    <TableCell>{stats.batting.highest_score}</TableCell>
                    <TableCell>{stats.batting.average.toFixed(2)}</TableCell>
                    <TableCell>{stats.batting.balls}</TableCell>
                    <TableCell>
                      {stats.batting.strike_rate.toFixed(2)}
                    </TableCell>
                    <TableCell>{stats.batting.outs}</TableCell>
                    <TableCell>{stats.batting.not_outs}</TableCell>
                    <TableCell>{stats.batting.fours}</TableCell>
                    <TableCell>{stats.batting.sixes}</TableCell>
                    <TableCell>{stats.batting.half_centuries}</TableCell>
                    <TableCell>{stats.batting.centuries}</TableCell>
                    <TableCell>{stats.batting.catches}</TableCell>
                    <TableCell>{stats.batting.stumpings}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
        <div className="grid gap-4">
          <h2 className="text-lg font-semibold">
            Bowling Stats Against Opposition
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Opponent</TableHead>
                <TableHead>Matches</TableHead>
                <TableHead>Overs</TableHead>
                <TableHead>Wickets</TableHead>
                <TableHead>Avg</TableHead>
                <TableHead>ER</TableHead>
                <TableHead>SR</TableHead>
                <TableHead>4W</TableHead>
                <TableHead>5W</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(playerStats.by_opposition).map(
                ([opponent, stats]) => (
                  <TableRow key={opponent}>
                    <TableCell>{opponent}</TableCell>
                    <TableCell>{stats.bowling.matches}</TableCell>
                    <TableCell>
                      {(stats.bowling.balls / 6).toFixed(1)}
                    </TableCell>
                    <TableCell>{stats.bowling.wickets}</TableCell>
                    <TableCell>{stats.bowling.average.toFixed(2)}</TableCell>
                    <TableCell>
                      {stats.bowling.economy_rate.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {stats.bowling.strike_rate.toFixed(2)}
                    </TableCell>
                    <TableCell>{stats.bowling.four_wickets}</TableCell>
                    <TableCell>{stats.bowling.five_wickets}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
