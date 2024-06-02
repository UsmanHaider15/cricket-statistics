import { leagues } from "@/setting";

export function generateStaticParams() {
  return leagues.map((league) => ({ league: league.name }));
}

export default function LeagueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
