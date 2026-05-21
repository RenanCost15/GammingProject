import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-grayDark text-grayLight py-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        <Link
          href="/"
          className="flex items-center gap-3 text-3xl font-bold hover:text-white transition-colors duration-300"
        >
          <Image
            src="/images/logo.png"
            alt="MorphGames MG Logo"
            width={40}
            height={40}
            className="rounded-md"
            priority
          />
          <span>
            MorphGames <span className="italic">MG</span>
          </span>
        </Link>

        <nav className="flex flex-wrap justify-center sm:justify-end gap-4">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/creators", label: "Creators" },
            { href: "/developers", label: "Developers" },
            { href: "/games", label: "Games" },
            { href: "/platforms", label: "Platforms" },
            { href: "/publishers", label: "Publishers" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-bold text-grayLight hover:text-white
                         transform hover:translate-y-0.5 transition-all duration-500
                         hover:shadow-lg hover:shadow-gray-500
                         rounded-lg px-2 py-1"
            >
              {label}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}
