export type PlayerStats = {
  name: string;
  overall: Stats;
  by_season: Record<string, Stats>;
  by_opposition: Record<string, Stats>;
};

export type LeaguePlayersStatsArray = [string, PlayerStats][];

export type Leagues = Record<string, LeaguePlayersStatsArray>;

type Stats = {
  batting: Batting;
  bowling: Bowling;
};

type Batting = {
  matches: number;
  outs: number;
  not_outs: number;
  runs: number;
  highest_score: number;
  average: number;
  balls: number;
  strike_rate: number;
  centuries: number;
  half_centuries: number;
  fours: number;
  sixes: number;
  catches: number;
  stumpings: number;
};

type Bowling = {
  matches: number;
  balls: number;
  runs: number;
  wickets: number;
  best_bowling: BestBowling;
  average: number;
  economy_rate: number;
  strike_rate: number;
  four_wickets: number;
  five_wickets: number;
};

type BestBowling = {
  runs: number;
  wickets: number;
};
