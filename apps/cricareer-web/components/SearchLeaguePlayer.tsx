"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { lookup, playersIndex } from "@/setting";
import Link from "next/link";

interface Player {
  id: string;
  name: string;
  league: string;
}

const SearchLeaguePlayer = ({ league }: { league: string }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Player[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  useEffect(() => {
    if (searchTerm) {
      const fetchedResults = playersIndex.filter(
        (player: Player) =>
          player.league === league &&
          player.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(fetchedResults);
      setNoResults(fetchedResults.length === 0);
    } else {
      setResults([]);
      setNoResults(false);
    }
  }, [searchTerm, league]);

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <Input
          className="w-full bg-gray-200 text-gray-900 placeholder:text-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
          placeholder={`Search for a ${lookup[league]} player...`}
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <div className="absolute left-0 right-0 z-50 mt-2 rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <div className="max-h-[200px] overflow-auto">
              <div className="space-y-1 p-2">
                {results.map((result, index) => (
                  <Link
                    key={index}
                    href={`/${result.league}/player/${result.id}`}
                  >
                    <div
                      className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                      tabIndex={0}
                      role="button"
                      aria-pressed="false"
                    >
                      <span className="font-medium">{result.name}</span>
                      <span className="ml-auto text-gray-500 dark:text-gray-400">
                        {lookup[league]}
                      </span>
                    </div>
                  </Link>
                ))}
                {noResults && (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    No results found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchLeaguePlayer;
