import SearchLeaguePlayer from "@/components/SearchLeaguePlayer";
import { leagues } from "@/setting";

export function generateStaticParams() {
  return leagues.map((league) => ({ league: league.name }));
}

export default function LeagueLayout({
  children,
  params: { league },
}: {
  children: React.ReactNode;
  params: { league: string };
}) {
  return (
    <section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Find Your Favorite Players
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Search for players and view their stats and highlights.
              </p>
            </div>
            <SearchLeaguePlayer league={league} />
          </div>
        </div>
      </section>
      {children}
    </section>
  );
}
