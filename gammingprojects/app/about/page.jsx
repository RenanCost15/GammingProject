export default function About() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-darkOpacityS via-grayDarkOpacityMd to-darkOpacityS px-6 py-16 overflow-hidden">
      
      {/* Glow decorativo */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-silver/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-charcoal/30 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center space-y-12 text-light">

        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About <span className="text-silver">MorphGames MG</span>
          </h1>
          <p className="text-lg md:text-xl text-grayLight">
            A platform built to connect gamers with the world behind the games.
          </p>
        </div>

        {/* Intro */}
        <div className="space-y-4 text-grayLight text-base md:text-lg leading-relaxed">
          <p>
            MorphGames MG is a platform created to explore the gaming universe,
            connecting players to developers, platforms, and publishers in a
            simple and intuitive way.
          </p>
          <p>
            With a modern design and smooth navigation, our goal is to deliver a
            unique and immersive experience for gamers and anyone curious about
            the gaming industry.
          </p>
        </div>

        {/* Mission / Vision / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          
          <div className="bg-darkOpacityS/10 rounded-2xl p-6 shadow-lg backdrop-blur">
            <h3 className="text-2xl font-semibold text-silver mb-3">
              Mission
            </h3>
            <p className="text-grayLight text-sm leading-relaxed">
              To be a central hub for gaming enthusiasts, offering quality
              content, updates, and an interactive space to explore everything
              the gaming world has to offer.
            </p>
          </div>

          <div className="bg-darkOpacityS/10 rounded-2xl p-6 shadow-lg backdrop-blur">
            <h3 className="text-2xl font-semibold text-silver mb-3">
              Vision
            </h3>
            <p className="text-grayLight text-sm leading-relaxed">
              To become the most reliable and user-friendly platform for
              discovering games, embracing innovation for all types of players.
            </p>
          </div>

          <div className="bg-darkOpacityS/10 rounded-2xl p-6 shadow-lg backdrop-blur">
            <h3 className="text-2xl font-semibold text-silver mb-3">
              Values
            </h3>
            <ul className="text-grayLight text-sm space-y-2 text-left">
              <li><strong>Innovation:</strong> Constantly improving experiences.</li>
              <li><strong>Commitment:</strong> Reliability and security first.</li>
              <li><strong>Community:</strong> Strong connection with gamers and developers.</li>
            </ul>
          </div>
        </div>

        {/* Team */}
        <div className="space-y-3 pt-6">
          <h4 className="text-2xl font-semibold text-charcoal">
            Our Team
          </h4>
          <p className="text-grayLight max-w-2xl mx-auto">
            We are a team passionate about technology and gaming, driven by the
            desire to create meaningful experiences for players around the
            world.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <a
            href="/"
            className="px-8 py-3 border border-grayMedium text-light font-semibold rounded-full transition-all duration-300 hover:bg-light hover:text-darkOpacityS"
          >
            Back to Home
          </a>

          <a
            href="/games"
            className="px-8 py-3 bg-silver text-light font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-charcoal"
          >
            Start Exploring
          </a>
        </div>

      </div>
    </div>
  );
}
