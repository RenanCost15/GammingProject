'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiGlobe, FiMoon, FiSun } from 'react-icons/fi';
import { useAppSettings } from './AppProviders';

const navigation = [
  { href: '/', key: 'nav.home' },
  { href: '/games', key: 'nav.games' },
  { href: '/creators', key: 'nav.creators' },
  { href: '/developers', key: 'nav.developers' },
  { href: '/platforms', key: 'nav.platforms' },
  { href: '/publishers', key: 'nav.publishers' },
  { href: '/about', key: 'nav.about' },
];

export default function Header() {
  const { language, setLanguage, theme, setTheme, t } = useAppSettings();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-abyss/85 backdrop-blur-2xl">
      <div className="container-pro flex flex-col gap-4 px-4 py-4 sm:px-6 xl:flex-row xl:items-center xl:justify-between xl:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="RedCore Games">
          <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-crimson/40 bg-onyx shadow-neon">
            <Image src="/images/logo.svg" alt="Logo RedCore Games" width={42} height={42} priority />
          </span>
          <span className="leading-none">
            <span className="block text-xl font-black uppercase tracking-tight text-frost transition group-hover:text-crimson">
              RedCore
            </span>
            <span className="block text-xs font-bold uppercase tracking-[0.32em] text-smoke">Games</span>
          </span>
        </Link>

        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-end">
          <nav className="flex flex-wrap items-center gap-2 xl:justify-end" aria-label="Navegação principal">
            {navigation.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className="rounded-full px-3 py-2 text-xs font-extrabold uppercase tracking-wide text-ash transition duration-300 hover:bg-crimson hover:text-white sm:text-sm"
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-wide text-ash">
              <FiGlobe className="text-crimson" />
              <span className="sr-only">{t('controls.language')}</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="bg-transparent text-xs font-black uppercase tracking-wide outline-none"
                aria-label={t('controls.language')}
              >
                <option value="pt-BR">PT-BR</option>
                <option value="en">EN</option>
              </select>
            </label>

            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-wide text-ash transition hover:border-crimson hover:text-frost"
              aria-label={t('controls.theme')}
            >
              {theme === 'dark' ? <FiMoon className="text-crimson" /> : <FiSun className="text-crimson" />}
              {theme === 'dark' ? t('controls.dark') : t('controls.light')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
