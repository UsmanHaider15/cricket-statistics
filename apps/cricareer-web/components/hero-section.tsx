import SearchPlayer from "./SearchPlayer";

const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center animate-moveUpInitial">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
              Unleash the Power of Cricket Stats
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Search batting and bowling stats of more than{" "}
              <span className="font-bold">10000</span> players across all the
              leagues and T20I.
            </p>
          </div>
          <SearchPlayer />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
