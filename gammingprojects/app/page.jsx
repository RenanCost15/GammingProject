export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-darkOpacityS via-grayDarkOpacityMd to-darkOpacityS px-6 py-12 overflow-hidden">
      
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-silver/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-charcoal/30 rounded-full blur-3xl" />

      <div className="relative max-w-3xl text-center space-y-8">
        
        <h1 className="text-4xl md:text-5xl font-bold text-light tracking-tight">
          Welcome to{" "}
          <span className="text-silver">MorphGames MG</span>
        </h1>

        <p className="text-lg md:text-xl text-grayLight">
          Your journey into the world of games starts here.
        </p>

        <p className="text-sm md:text-base text-grayMedium">
          Explore games, platforms, developers, and everything that makes the
          gaming universe amazing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <a
            href="/games"
            className="px-8 py-3 bg-silver text-light font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-charcoal"
          >
            Start Exploring
          </a>

          <a
            href="/about"
            className="px-8 py-3 border border-grayMedium text-light font-semibold rounded-full transition-all duration-300 hover:bg-light hover:text-darkOpacityS"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
