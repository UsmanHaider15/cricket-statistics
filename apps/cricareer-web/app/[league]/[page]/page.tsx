import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";
import { leaguesPlayersStats } from "@/setting";

const ITEMS_PER_PAGE = 40;

export async function generateStaticParams({
  params: { league },
}: {
  params: { league: string };
}) {
  const pages = Math.ceil(leaguesPlayersStats[league].length / ITEMS_PER_PAGE);
  const params = [];

  for (let i = 1; i <= pages; i++) {
    params.push({ league, page: i.toString() });
  }
  return params;
}

export default function League({
  params,
}: {
  params: { league: string; page: string };
}) {
  const { league, page } = params;
  const leaguePlayersStats = leaguesPlayersStats[league];
  const currentPage = parseInt(page, 10);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const totalPages = Math.ceil(leaguePlayersStats.length / ITEMS_PER_PAGE);
  const playersToShow = leaguePlayersStats.slice(startIndex, endIndex);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPageLinks = 5;
    const leftMostPage = Math.max(
      1,
      currentPage - Math.floor(maxPageLinks / 2)
    );
    const rightMostPage = Math.min(
      totalPages,
      currentPage + Math.floor(maxPageLinks / 2)
    );

    for (let i = leftMostPage; i <= rightMostPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {playersToShow.map(([player, stats], index) => (
              <div className="relative group shadow-lg px-4" key={index}>
                <img
                  alt="Player Image"
                  className="rounded-lg object-cover w-full aspect-square transition-opacity"
                  height={300}
                  src="/placeholder.svg"
                  width={300}
                />
                <div className="flex-1 py-4">
                  <h3 className="font-semibold tracking-tight text-xl">
                    {stats.name}
                  </h3>
                  <Link href={`/${league}/player/${player}`}>
                    <Button className="mt-2 bg-black text-white hover:bg-gray-700">
                      View Stats
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={`/${league}/${currentPage - 1}`}
                    />
                  </PaginationItem>
                )}
                {pageNumbers[0] > 1 && (
                  <>
                    <PaginationItem>
                      <PaginationLink href={`/${league}/1`}>1</PaginationLink>
                    </PaginationItem>
                    <PaginationEllipsis />
                  </>
                )}
                {pageNumbers.map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={`/${league}/${pageNumber}`}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {pageNumbers[pageNumbers.length - 1] < totalPages && (
                  <>
                    <PaginationEllipsis />
                    <PaginationItem>
                      <PaginationLink href={`/${league}/${totalPages}`}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`/${league}/${currentPage + 1}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>
    </>
  );
}
