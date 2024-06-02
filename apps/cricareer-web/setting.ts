import ipl from "@/data/ipl.json";
import psl from "@/data/psl.json";
import bbl from "@/data/bbl.json";
import lpl from "@/data/lpl.json";
import cpl from "@/data/cpl.json";
import ssm_male from "@/data/ssm_male.json";
import ssm_female from "@/data/ssm_female.json";
import hnd_male from "@/data/hnd_male.json";
import hnd_female from "@/data/hnd_female.json";
import wbb from "@/data/wbb.json";
import ntb from "@/data/ntb.json";
import bpl from "@/data/bpl.json";
import msl from "@/data/msl.json";
import t20is_male from "@/data/t20is_male.json";
import t20is_female from "@/data/t20is_female.json";
import { LeaguePlayersStatsArray } from "@/types";

export type League = {
  title: string;
  name: string;
  description: string;
  image: string;
  href: string;
};

export const leagues: League[] = [
  {
    title: "IPL",
    name: "ipl",
    description: "Indian Premier League",
    image: "/ipl.png",
    href: "/ipl",
  },
  {
    title: "PSL",
    name: "psl",
    description: "Pakistan Super League",
    image: "/psl.png",
    href: "/psl",
  },
  {
    title: "BBL",
    name: "bbl",
    description: "Big Bash League",
    image: "/bbl.png",
    href: "/bbl",
  },
  {
    title: "LPL",
    name: "lpl",
    description: "Lanka Premier League",
    image: "/lpl.jpeg",
    href: "/lpl",
  },
  {
    title: "CPL",
    name: "cpl",
    description: "Caribbean Premier League",
    image: "/cpl.jpeg",
    href: "/cpl",
  },
  {
    title: "BPL",
    name: "bpl",
    description: "Bangladesh Premier League",
    image: "/bpl.webp",
    href: "/bpl",
  },
  {
    title: "Super Smash Male",
    name: "ssm_male",
    description: "Super Smash Male",
    image: "/ssm_male.png",
    href: "/ssm_male",
  },
  {
    title: "Super Smash Female",
    name: "ssm_female",
    description: "Super Smash Female",
    image: "/ssm_female.png",
    href: "/ssm_female",
  },
  {
    title: "Mzansi Super League",
    name: "msl",
    description: "Mzansi Super League",
    image: "/msl.png",
    href: "/msl",
  },
  {
    title: "The Hundreds Male",
    name: "hnd_male",
    description: "The Hundreds Male",
    image: "/hnd_male.webp",
    href: "/hnd_male",
  },
  {
    title: "The Hundreds Female",
    name: "hnd_female",
    description: "The Hundreds Female",
    image: "/hnd_female.jpeg",
    href: "/hnd_female",
  },
  {
    title: "WBBL",
    name: "wbb",
    description: "Women's Big Bash League",
    image: "/wbbl.png",
    href: "/wbb",
  },
  {
    title: "NTB",
    name: "ntb",
    description: "T20 Blast",
    image: "/ntb.png",
    href: "/ntb",
  },
];

export const T20Is: League[] = [
  {
    title: "T20Is Male",
    name: "t20is_male",
    description: "T20 International Male",
    image: "/t20is_male.jpeg",
    href: "/t20is_male",
  },
  {
    title: "T20Is Female",
    name: "t20is_female",
    description: "T20 International Female",
    image: "/t20is_female.png",
    href: "/t20is_female",
  },
];

export const leaguesPlayersStats: Record<string, LeaguePlayersStatsArray> = {
  // @ts-ignore
  psl: psl.slice(0, 300),
  // @ts-ignore
  ipl: ipl.slice(0, 300),
  // @ts-ignore
  bbl: bbl.slice(0, 300),
  // @ts-ignore
  lpl: lpl.slice(0, 300),
  // @ts-ignore
  cpl: cpl.slice(0, 300),
  // @ts-ignore
  ssm_female: ssm_female.slice(0, 300),
  // @ts-ignore
  ssm_male: ssm_male.slice(0, 300),
  // @ts-ignore
  hnd_female: ssm_female.slice(0, 300),
  // @ts-ignore
  hnd_male: hnd_male.slice(0, 300),
  // @ts-ignore
  wbb: wbb.slice(0, 300),
  // @ts-ignore
  msl: msl.slice(0, 300),
  // @ts-ignore
  ntb: ntb.slice(0, 300),
  // @ts-ignore
  bpl: bpl.slice(0, 300),
  // @ts-ignore
  t20is_female: t20is_female.slice(0, 300),
  // @ts-ignore
  t20is_male: t20is_male.slice(0, 300),
};

interface PlayerInput {
  [league: string]: {
    [player_id: string]: {
      name: string;
    };
  };
}

interface PlayerOutput {
  id: string;
  name: string;
  league: string;
}

function convertPlayerData(
  input: Record<string, LeaguePlayersStatsArray>
): PlayerOutput[] {
  const result: PlayerOutput[] = [];

  for (const league in input) {
    if (input.hasOwnProperty(league)) {
      const players = input[league];
      players.forEach(([player_id, player]) => {
        result.push({
          id: player_id,
          name: player.name,
          league: league,
        });
      });
    }
  }

  return result;
}

export const playersIndex = convertPlayerData(leaguesPlayersStats);

export const lookup: { [key: string]: string } = {
  ipl: "IPL",
  psl: "PSL",
  bbl: "BBL",
  lpl: "LPL",
  cpl: "CPL",
  wbb: "WBBL",
  ntb: "T20 Blast",
  bpl: "BPL",
  msl: "MSL",
  ssm_female: "Super Smash Female",
  ssm_male: "Super Smash Male",
  hnd_female: "The Hundreds Female",
  hnd_male: "The Hundreds Male",
  t20is_female: "T20Is Female",
  t20is_male: "T20Is Male",
};
